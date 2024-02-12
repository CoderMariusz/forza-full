'use client';
import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

type QrScannerProps = {
  setReading: (e: any) => void;
};

const QrScanner: React.FC<QrScannerProps> = ({ setReading }) => {
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
                      setReading(code.data);
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
    <div className='w-full h-full flex justify-center'>
      <video
        width={300}
        height={300}
        ref={videoRef}
        style={{ display: 'block' }}></video>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}></canvas>
      {qrCode && (
        <p>
          Code:{' '}
          {qrCode.split('@!').map((i, index) => {
            return (
              <p key={index}>
                {index} {i}
              </p>
            );
          })}
        </p>
      )}
    </div>
  );
};

export default QrScanner;
