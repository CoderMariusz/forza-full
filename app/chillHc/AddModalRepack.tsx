import { Product } from '@/store/Products';
import React, { use, useEffect, useState } from 'react';

function AddRepackItemModal({
  isOpen,
  onClose,
  products,
  onAdd
}: {
  isOpen: boolean;
  onClose: any;
  products: Product[];
  onAdd: (item: any) => void;
}) {
  const [aCode, setACode] = useState('');
  const [line, setLine] = useState('');
  const [rmCode, setRmCode] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [repack, setRepack] = useState(true);

  const dummyProducts = [
    {
      aCode: 'A0001',
      rmCode: 'RM0001',
      name: 'British ham 120g'
    },
    {
      aCode: 'A0002',
      rmCode: 'RM0002',
      name: 'Cornedbeef 100g'
    },
    {
      aCode: 'A0003',
      rmCode: 'RM0003',
      name: 'Chicken 180g'
    },
    {
      aCode: 'A0004',
      rmCode: 'RM0004',
      name: 'Chicken 200g'
    },
    {
      aCode: 'A 0005',
      rmCode: 'RM0005',
      name: 'Stuffed Chicken 120g'
    }
  ];

  const handleACodeSearch = (aCodeValue: string) => {
    // Find product by aCode
    const foundProduct = dummyProducts.find(
      (product) => product.aCode === aCodeValue
    );

    if (foundProduct) {
      // Set RM-Code and Name based on the found product
      setRmCode(foundProduct.rmCode);
      setName(foundProduct.name);
    } else {
      // Reset RM-Code and Name if no product is found
      setRmCode('');
      setName('');
    }

    // Update A-Code state
    setACode(aCodeValue);
  };

  const handleSubmit = () => {
    setRepack(true);
    const newItem = {
      aCode,
      rmCode,
      name,
      weight: parseFloat(weight),
      date,
      repack
    };

    onAdd(newItem);
    handleClose();
  };

  useEffect(() => {
    handleACodeSearch(aCode);
  }, [aCode]);

  const handleClose = () => {
    // Reset the form
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

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            RM-Code
          </label>
          <input
            type='text'
            placeholder='RM-Code'
            value={rmCode}
            onChange={(e) => setRmCode(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

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

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Date
          </label>
          <input
            type='date'
            placeholder='Date'
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
