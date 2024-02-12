import QrScanner from '@/lib/QrScanner';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface ScannerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setReading: (reading: any) => void;
}

function ScannerModal({ open, setOpen, setReading }: ScannerModalProps) {
  if (!open) return null;

  return (
    <div className='absolute w-72 h-64'>
      <h1>
        Scanner Modal
        <QrCodeIcon className='h-7 w-7 text-gray-800 ' />
      </h1>
      <QrScanner setReading={(e) => setReading(e)} />
      <button
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        onClick={() => setOpen(false)}>
        close
      </button>
    </div>
  );
}

export default ScannerModal;
