"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import * as ort from 'onnxruntime-web';

// Class isimleri (modelin gerçek 4 sınıfı)
const classNames = [
  "Unlabeled",
  "leaning_backward", 
  "leaning_forward",
  "upright"
];

// Basit NMS fonksiyonu
function nms(boxes, scores, iouThreshold = 0.5) {
  const picked = [];
  let indexes = scores
    .map((score, idx) => [score, idx])
    .sort((a, b) => b[0] - a[0])
    .map(item => item[1]);
  while (indexes.length > 0) {
    const current = indexes.shift();
    picked.push(current);
    indexes = indexes.filter(idx => {
      const iou = computeIoU(boxes[current], boxes[idx]);
      return iou < iouThreshold;
    });
  }
  return picked;
}

function computeIoU(box1, box2) {
  const [x1, y1, w1, h1] = box1;
  const [x2, y2, w2, h2] = box2;
  const xi1 = Math.max(x1, x2);
  const yi1 = Math.max(y1, y2);
  const xi2 = Math.min(x1 + w1, x2 + w2);
  const yi2 = Math.min(y1 + h1, y2 + h2);
  const interArea = Math.max(0, xi2 - xi1) * Math.max(0, yi2 - yi1);
  const box1Area = w1 * h1;
  const box2Area = w2 * h2;
  const unionArea = box1Area + box2Area - interArea;
  return unionArea === 0 ? 0 : interArea / unionArea;
}

export default function PostureCam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const sessionRef = useRef(null);
  const inputNameRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [displayedDetections, setDisplayedDetections] = useState([]);

  // runDetection fonksiyonunu component seviyesine taşı
  const runDetection = useCallback(async () => {
    if (!sessionRef.current || !videoRef.current || !canvasRef.current || !modelLoaded) {
      return;
    }
    
    // Inference throttling
    if (!runDetection.lastInference) runDetection.lastInference = 0;
    const now = Date.now();
    if (now - runDetection.lastInference < 500) {
      return;
    }
    runDetection.lastInference = now;
    
    if (videoRef.current.readyState === 4) {
      try {
        // 1. Frame'i 224x224'e resize et (model 224x224 bekliyor)
        const offscreen = document.createElement('canvas');
        offscreen.width = 224;
        offscreen.height = 224;
        const offCtx = offscreen.getContext('2d');
        offCtx.drawImage(videoRef.current, 0, 0, 224, 224);
        const resizedImageData = offCtx.getImageData(0, 0, 224, 224);

        // 2. RGB ve normalize (0-1 arası)
        const { data } = resizedImageData;
        const float32Data = new Float32Array(1 * 3 * 224 * 224);
        for (let i = 0; i < 224 * 224; i++) {
          float32Data[i] = data[i * 4] / 255; // R
          float32Data[i + 224 * 224] = data[i * 4 + 1] / 255; // G
          float32Data[i + 2 * 224 * 224] = data[i * 4 + 2] / 255; // B
        }

        // 3. Model inputu oluştur (224x224 boyutunda)
        const inputTensor = new ort.Tensor('float32', float32Data, [1, 3, 224, 224]);
        const feeds = { [inputNameRef.current]: inputTensor };

        // 4. Modeli çalıştır
        const results = await sessionRef.current.run(feeds);
        const output = results[Object.keys(results)[0]].data;

        // Model output formatını kontrol et
        if (output.length === 4) {
          // Classification için basit bir sonuç göster
          const maxIndex = output.indexOf(Math.max(...output));
          const confidence = output[maxIndex];
          const classLabel = classNames[maxIndex] || `Class ${maxIndex}`;
          
          if (confidence > 0.1) {
            const detected = [{
              classLabel,
              confidence: confidence
            }];
            
            setDetections(detected);
          } else {
            setDetections([]);
          }
          return; // Classification modeli için erken çık
        }

        // 5. Postprocess: Kutu, skor, sınıf topla (sadece detection modeli için)
        const boxes = [];
        const scores = [];
        const classes = [];
        const detected = [];
        
        for (let i = 0; i < 8400; i++) {
          const x = output[i * 6];
          const y = output[i * 6 + 1];
          const w = output[i * 6 + 2];
          const h = output[i * 6 + 3];
          const conf = output[i * 6 + 4];
          const cls = output[i * 6 + 5];
          const roundedCls = Math.round(cls);
          
          if (
            conf > 0.3 &&
            Number.isFinite(x) && Number.isFinite(y) &&
            Number.isFinite(w) && Number.isFinite(h) &&
            w > 0 && h > 0 &&
            Number.isFinite(cls) &&
            (roundedCls === 0 || roundedCls === 1)
          ) {
            const classLabel = classNames[roundedCls];
            const ctx = canvasRef.current.getContext('2d');
            const scaleX = canvasRef.current.width / 224;
            const scaleY = canvasRef.current.height / 224;
            const left = (x - w / 2) * scaleX;
            const top = (y - h / 2) * scaleY;
            
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(left, top, w * scaleX, h * scaleY);
            
            detected.push({
              classLabel,
              confidence: conf
            });
          }
        }
        
        // NMS uygula (threshold 0.7)
        const picked = nms(boxes, scores, 0.7);
        
        // Sadece değişiklik varsa state güncelle
        setDetections(prev => {
          const prevStr = JSON.stringify(prev);
          const currStr = JSON.stringify(detected);
          return prevStr !== currStr ? detected : prev;
        });
      } catch (err) {
        console.error('Detection hatası:', err);
      }
    }
  }, [modelLoaded]);

  // Model yükleme fonksiyonu
  const loadModel = async () => {
    if (modelLoaded || loadingModel) return;
    
    setLoadingModel(true);
    setError("");
    
    try {
      // WASM dosyalarının yolunu ayarla
      ort.env.wasm.wasmPaths = '/models/';
      
      // ONNX modelini yükle (onnxruntime-web)
      const session = await ort.InferenceSession.create('/models/RoboFlowModel.onnx');
      sessionRef.current = session;
      
      // Modelin input adını al
      inputNameRef.current = session.inputNames[0];
      
      setModelLoaded(true);
    } catch (err) {
      console.error('Model yükleme hatası:', err);
      setError('Model yüklenemedi: ' + err.message);
      setModelLoaded(false);
    } finally {
      setLoadingModel(false);
    }
  };

  // Kamera açma fonksiyonu
  const openCamera = async () => {
    if (loadingCamera) return;
    
    setLoadingCamera(true);
    setError("");
    
    try {
      // Kamera desteğini kontrol et
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Kamera desteği bulunamadı.");
      }

      // Kamera izni iste
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 224 },
          height: { ideal: 224 },
          facingMode: 'user'
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
          // Model yüklüyse detection'ı başlat
          if (modelLoaded) {
            runDetection();
          }
        };
        
        videoRef.current.onerror = (e) => {
          console.error('Video hatası:', e);
          setError('Video yüklenirken hata oluştu');
        };
      }
    } catch (err) {
      console.error('Kamera açma hatası:', err);
      setError('Kamera açılamadı: ' + err.message);
      setCameraOn(false);
    } finally {
      setLoadingCamera(false);
    }
  };

  useEffect(() => {
    let animationId;
    let isMounted = true;

    if (cameraOn && modelLoaded) {
      const runDetectionLoop = () => {
        if (!isMounted) return;
        runDetection();
        animationId = requestAnimationFrame(runDetectionLoop);
      };
      
      runDetectionLoop();
    }

    return () => {
      isMounted = false;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [cameraOn, modelLoaded, runDetection]);

  useEffect(() => {
    if (!cameraOn) return;
    
    const interval = setInterval(() => {
      setDisplayedDetections(
        detections
          .filter(det => det.confidence > 0.1)
          .sort((a, b) => b.confidence - a.confidence)
          .slice(0, 1) // sadece en yüksek confidence'lı tespit
      );
    }, 500);
    
    return () => clearInterval(interval);
  }, [cameraOn, detections]);

  const handleOpenCamera = async () => {
    setCameraOn(true);
    setError("");
    
    // Önce modeli yükle
    await loadModel();
    
    // Sonra kamerayı aç
    await openCamera();
  };

  const handleCloseCamera = () => {
    setCameraOn(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  };

  return (
    <div className="camera-container min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">Duruş Analizi</h1>
      
      {error && (
        <div className="text-red-600 mb-4 p-3 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      
      {loadingModel && (
        <div className="text-blue-600 mb-4 p-3 bg-blue-100 rounded-lg animate-pulse">
          Model yükleniyor, lütfen bekleyin...
        </div>
      )}
      
      {loadingCamera && (
        <div className="text-green-600 mb-4 p-3 bg-green-100 rounded-lg animate-pulse">
          Kamera açılıyor, lütfen bekleyin...
        </div>
      )}
      
      {cameraOn ? (
        <>
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              width={224}
              height={224}
              className="rounded shadow"
              style={{ zIndex: 1 }}
            />
            {/* Canvas sadece video açıkken ve model yüklendiğinde gösterilir */}
            <canvas
              ref={canvasRef}
              width={224}
              height={224}
              className="absolute left-0 top-0 rounded pointer-events-none"
              style={{ zIndex: 2 }}
            />
          </div>
          
          {/* Tespit edilen kutuların class ve confidence değerlerini kameranın altına yazdır */}
          {displayedDetections.length > 0 && (
            <div className="mt-4 w-full flex flex-col items-center">
              {displayedDetections.map((det, i) => (
                <div key={i} className="detection-badge bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
                  <span className="capitalize">{det.classLabel.replace('_', ' ')}</span>
                  <strong className="ml-2">%{(det.confidence * 100).toFixed(1)}</strong>
                </div>
              ))}
            </div>
          )}
          
          {/* Eğer hiç tespit yoksa bilgi mesajı göster */}
          {cameraOn && displayedDetections.length === 0 && (
            <div className="mt-4 text-gray-500 text-center">
              Duruş analizi yapılıyor... Lütfen kameraya bakın.
            </div>
          )}
          
          <button
            onClick={handleCloseCamera}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow hover:bg-red-700 transition"
          >
            Kamerayı Kapat
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleOpenCamera}
            disabled={loadingModel || loadingCamera}
            className={`px-6 py-2 rounded-lg font-bold shadow transition ${
              loadingModel || loadingCamera
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loadingModel || loadingCamera ? 'Yükleniyor...' : 'Kamerayı Aç'}
          </button>
          <div className="text-gray-500 mt-8">Kamera kapalı.</div>
        </>
      )}
    </div>
  );
} 