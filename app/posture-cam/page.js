"use client";
import { useEffect, useRef, useState } from 'react';

export default function PostureCam() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState('');
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    if (!cameraOn) return;
    async function openCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Kamera desteği bulunamadı.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Kamera açılamadı: ' + err.message);
      }
    }
    openCamera();

    return () => {
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
  }, [cameraOn]);

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Duruş Analizi (Kamera Açık)</h1>
      {error && <div className="text-red-600">{error}</div>}
      {cameraOn ? (
        <>
          <video ref={videoRef} autoPlay playsInline width={640} height={480} className="rounded shadow" />
          <button onClick={handleCloseCamera} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow hover:bg-red-700 transition">Kamerayı Kapat</button>
        </>
      ) : (
        <div className="text-gray-500 mt-8">Kamera kapalı.</div>
      )}
      <p className="mt-4 text-gray-500">Burada yakında YOLO ile duruş analizi yapılacak.</p>
    </div>
  );
} 