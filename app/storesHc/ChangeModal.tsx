'use client';
import React, { useState, useEffect } from 'react';

function EditItemModal({
  isOpen,
  onClose,
  onEdit,
  item
}: {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: any) => void;
  item: any;
}) {
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    if (item) {
      setQuantities(item.quantities);
    }
  }, [item]);

  const handlequantitiesChange = (index: number, value: any) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Number(value);
    setQuantities(newQuantities);
  };

  const handleAddquantities = () => {
    setQuantities([...quantities, 0]);
  };

  const handleRemovequantities = (index: number) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };

  const handleSubmit = () => {
    const updatedItem = {
      ...item,
      quantities: quantities.filter((qty) => !isNaN(qty) && qty > 0)
    };

    onEdit(updatedItem);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-4'>Edit Item</h2>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Code (Read Only)
          </label>
          <input
            type='text'
            value={item.code}
            readOnly
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name (Read Only)
          </label>
          <input
            type='text'
            value={item.name}
            readOnly
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100'
          />
        </div>

        {quantities.map((quantities, index) => (
          <div
            key={index}
            className='mb-4 flex'>
            <input
              type='number'
              value={quantities}
              onChange={(e) => handlequantitiesChange(index, e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <button
              onClick={() => handleRemovequantities(index)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'>
              -
            </button>
          </div>
        ))}
        <button
          onClick={handleAddquantities}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
          Add quantities
        </button>

        <div className='flex items-center justify-between'>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Save Changes
          </button>
          <button
            onClick={onClose}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItemModal;
