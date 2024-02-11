'use client';
import { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import Link from 'next/link';

export default function QRPage(props: any) {
  const [scanResult, setScanResult] = useState('');
  const [inputData1, setInputData1] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [inputData3, setInputData3] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const { Canvas } = useQRCode();

  useEffect(() => {
    const handler = (e: any) => {
      setScanResult(e.data);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-4'>Scan QR Code</h2>
        <Canvas
          text={inputData1 + ' ' + inputData2 + ' ' + inputData3}
          options={{
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#010599FF',
              light: '#FFBF60FF'
            }
          }}
        />
      </div>
      <div className='flex flex-col items-center mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Generate QR Code</h2>
        <input
          type='text'
          placeholder='Input 1'
          value={inputData1}
          onChange={(e) => setInputData1(e.target.value)}
          className='mb-2 p-2 border rounded'
        />
        <input
          type='text'
          placeholder='Input 2'
          value={inputData2}
          onChange={(e) => setInputData2(e.target.value)}
          className='mb-2 p-2 border rounded'
        />
        <input
          type='text'
          placeholder='Input 3'
          value={inputData3}
          onChange={(e) => setInputData3(e.target.value)}
          className='mb-2 p-2 border rounded'
        />
      </div>
      <div>
        <Link href='/qr/scanner'>
          <p className='text-blue-500'>Go to Scanner</p>
        </Link>
      </div>
    </div>
  );
}
