"use client";
import { useEffect, useRef, useState } from 'react';
import * as ort from 'onnxruntime-web';

// Class isimleri (data.yaml'dan)
const classNames = [
  "------------------------------",
  "Sitting Posture v2 - v4 2025-01-01 4-47pm"
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
  const sessionRef = useRef(null);
  const inputNameRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [displayedDetections, setDisplayedDetections] = useState([]);

  useEffect(() => {
    let animationId;
    let isMounted = true;

    async function loadModelAndStart() {
      if (!cameraOn) return;
      setError("");
      try {
        // WASM dosyalarının yolunu ayarla
        ort.env.wasm.wasmPaths = '/models/';
        // ONNX modelini yükle (onnxruntime-web)
        const session = await ort.InferenceSession.create('/models/best.onnx');
        sessionRef.current = session;
        // Modelin input adını al
        inputNameRef.current = session.inputNames[0];
        setModelLoaded(true);

        // Kamera aç
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError("Kamera desteği bulunamadı.");
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            if (canvasRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
            runDetection();
          };
        }
      } catch (err) {
        setError('Kamera veya model açılamadı: ' + err.message);
      }
    }

    async function runDetection() {
      if (!sessionRef.current || !videoRef.current || !canvasRef.current) return;
      // Inference throttling
      if (!runDetection.lastInference) runDetection.lastInference = 0;
      const now = Date.now();
      if (now - runDetection.lastInference < 500) {
        animationId = requestAnimationFrame(runDetection);
        return;
      }
      runDetection.lastInference = now;
      if (videoRef.current.readyState === 4) {
        // 1. Frame'i 640x640'a resize et
        const offscreen = document.createElement('canvas');
        offscreen.width = 640;
        offscreen.height = 640;
        const offCtx = offscreen.getContext('2d');
        offCtx.drawImage(videoRef.current, 0, 0, 640, 640);
        const resizedImageData = offCtx.getImageData(0, 0, 640, 640);

        // 2. RGB ve normalize (0-1 arası)
        const { data } = resizedImageData;
        const float32Data = new Float32Array(1 * 3 * 640 * 640);
        for (let i = 0; i < 640 * 640; i++) {
          float32Data[i] = data[i * 4] / 255; // R
          float32Data[i + 640 * 640] = data[i * 4 + 1] / 255; // G
          float32Data[i + 2 * 640 * 640] = data[i * 4 + 2] / 255; // B
        }

        // 3. Model inputu oluştur
        const inputTensor = new ort.Tensor('float32', float32Data, [1, 3, 640, 640]);
        const feeds = { [inputNameRef.current]: inputTensor };

        // 4. Modeli çalıştır
        const results = await sessionRef.current.run(feeds);
        const output = results[Object.keys(results)[0]].data; // [1, 6, 8400]

        // 5. Postprocess: Kutu, skor, sınıf topla
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
            const scaleX = canvasRef.current.width / 640;
            const scaleY = canvasRef.current.height / 640;
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
      }
      animationId = requestAnimationFrame(runDetection);
    }

    if (cameraOn) {
      loadModelAndStart();
    }

    return () => {
      isMounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
      setModelLoaded(false);
    };
    // eslint-disable-next-line
  }, [cameraOn]);

  useEffect(() => {
    if (!cameraOn) return;
    const interval = setInterval(() => {
      setDisplayedDetections(
        detections
          .filter(det => det.confidence > 0.5)
          .sort((a, b) => b.confidence - a.confidence)
          .slice(0, 1) // sadece en yüksek confidence'lı tespit
      );
    }, 500);
    return () => clearInterval(interval);
  }, [cameraOn, detections]);

  const handleOpenCamera = () => {
    setCameraOn(true);
    setError("");
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
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {(!modelLoaded && cameraOn) && (
        <div className="text-blue-600 mb-2 animate-pulse">Model yükleniyor, lütfen bekleyin...</div>
      )}
      {cameraOn ? (
        <>
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              width={640}
              height={640}
              className="rounded shadow"
              style={{ zIndex: 1 }}
            />
            {/* Canvas sadece video açıkken ve model yüklendiğinde gösterilir */}
            <canvas
              ref={canvasRef}
              width={640}
              height={640}
              className="absolute left-0 top-0 rounded pointer-events-none"
              style={{ zIndex: 2 }}
            />
          </div>
          {/* Tespit edilen kutuların class ve confidence değerlerini kameranın altına yazdır */}
          {displayedDetections.length > 0 && (
            <div className="mt-4 w-full flex flex-col items-center">
              {displayedDetections.map((det, i) => (
                <div key={i} className="detection-badge">
                  <span>{det.classLabel}</span>
                  <strong>%{Math.min(100, (det.confidence * 75)).toFixed(1)}</strong>
                </div>
              ))}
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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition"
          >
            Kamerayı Aç
          </button>
          <div className="text-gray-500 mt-8">Kamera kapalı.</div>
        </>
      )}
    </div>
  );
} 