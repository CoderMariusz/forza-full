import React, { useState } from 'react';

function AddRMItemModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: any;
  onAdd: any;
}) {
  const [rmCode, setRmCode] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    const newItem = {
      rmCode,
      name,
      date,
      weight: parseFloat(weight) // Parse weight as a float
    };

    onAdd(newItem.rmCode, newItem.name, newItem.date, newItem.weight);
    handleClose();
  };

  const handleClose = () => {
    // Reset the form
    setRmCode('');
    setName('');
    setDate('');
    setWeight('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-4'>Add New RM Item</h2>

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

export default AddRMItemModal;
