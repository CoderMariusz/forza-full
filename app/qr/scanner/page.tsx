'use clinet';
import QrScanner from '@/lib/QrScanner';
import React, { useState } from 'react';

function ScannerPage() {
  return (
    <div>
      <h1>Scanner Page</h1>
      <QrScanner
        setReading={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

export default ScannerPage;
