import React, { useState, useEffect } from 'react';

interface Product {
  aCode: string;
  name: string;
  rmCode: string;
  // Assume other properties as needed
}

function AddRepackItemModal({
  isOpen,
  onClose,
  products,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAdd: (item: any) => void;
}) {
  const [aCode, setACode] = useState('');
  const [line, setLine] = useState('');
  const [rmCode, setRmCode] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  // Effect to update rmCode and name when aCode changes
  useEffect(() => {
    const product = products.find((p) => p.aCode === aCode);
    if (product) {
      setRmCode(product.rmCode);
      setName(product.name);
    } else {
      setRmCode('');
      setName('');
    }
  }, [aCode, products]);

  const handleSubmit = () => {
    const newItem = {
      aCode,
      line,
      rmCode,
      name,
      weight: parseFloat(weight),
      date,
      repack: true
    };

    onAdd(newItem);
    handleClose();
  };

  const handleClose = () => {
    setACode('');
    setLine('');
    setRmCode('');
    setName('');
    setWeight('');
    setDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-4'>Add New Repack Item</h2>

        {/* A-Code Input */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            A-Code
          </label>
          <input
            type='text'
            placeholder='A-Code'
            value={aCode}
            onChange={(e) => setACode(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        {/* RM-Code and Name are automatically set based on A-Code selection */}
        {/* Displaying RM-Code (Read-Only) */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            RM-Code
          </label>
          <input
            type='text'
            value={rmCode}
            readOnly
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              name ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Displaying Name (Read-Only) */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            value={name}
            readOnly
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              name ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Line Input */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Line
          </label>
          <input
            type='text'
            placeholder='Line'
            value={line}
            onChange={(e) => setLine(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        {/* Weight Input */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Weight
          </label>
          <input
            type='number'
            placeholder='Weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        {/* Date Input */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Date
          </label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Add
          </button>
          <button
            onClick={handleClose}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRepackItemModal;
