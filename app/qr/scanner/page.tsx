'use client';
import QrScanner from '@/lib/QrScanner';
import { useState } from 'react';

function ScannerPage() {
  const [reading, setReading] = useState('');

  return (
    <div>
      <h1>Scanner Page</h1>
      <QrScanner setReading={(e) => setReading(e)} />
    </div>
  );
}

export default ScannerPage;
