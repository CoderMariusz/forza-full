'use client';
import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const QrScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            const scanQrCode = () => {
              if (videoRef.current && videoRef.current.readyState === 4) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                if (canvas) {
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const imageData = ctx.getImageData(
                      0,
                      0,
                      canvas.width,
                      canvas.height
                    );
                    const code = jsQR(
                      imageData.data,
                      imageData.width,
                      imageData.height,
                      {
                        inversionAttempts: 'dontInvert'
                      }
                    );

                    if (code) {
                      setQrCode(code.data);
                      stream.getTracks().forEach((track) => track.stop());
                    } else {
                      requestAnimationFrame(scanQrCode);
                    }
                  }
                }
              } else {
                requestAnimationFrame(scanQrCode);
              }
            };

            scanQrCode();
          }
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        style={{ display: 'none' }}></video>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}></canvas>
      {qrCode && <p>Znaleziono kod QR: {qrCode}</p>}
    </>
  );
};

export default QrScanner;
