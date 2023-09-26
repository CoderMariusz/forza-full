'use client';
import React, { useState } from 'react';

interface Product {
  name: string;
  aCode: string;
  id: string;
  version: number;
  web: string;
  rates: number;
}

function ProductCard({ name, aCode, rates, version, web }: Product) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className='bg-white px-3 py-1 shadow-md rounded-md overflow-hidden mb-4 cursor-pointer md:cursor-default'
      onClick={() => setIsOpen(!isOpen)}>
      <ul
        className={`transition-all duration-200 ${
          isOpen ? 'flex flex-col' : 'flex'
        } md:flex-row md:gap-4 md:items-center overflow-hidden`}>
        <li className='flex-1 py-1'>
          <strong className='mr-1'>A-code:</strong>
          <p>{aCode}</p>
        </li>
        <li className='flex-1 py-1'>
          <strong className='mr-1'>Name:</strong>
          <p>{name}</p>
        </li>

        <div
          className={`transition-all duration-200 gap-4 flex flex-col md:flex-row ${
            isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 max-w-0'
          } md:opacity-100 md:max-h-screen`}>
          <li className='flex-1 py-1 '>
            <strong className='mr-1'>Rates:</strong>
            <span>{rates}</span>
          </li>
          <li className='flex-1 py-1'>
            <strong className='mr-1'>Version:</strong>
            <span>{version}</span>
          </li>
          <li className='flex-1 py-1'>
            <strong className='mr-1'>Web:</strong>
            <a
              href={web}
              className='text-blue-500 hover:underline'>
              {web}
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default ProductCard;
