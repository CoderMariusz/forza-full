import React, { useState } from 'react';

function AddItemModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: any;
  onAdd: any;
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [quantities, setQuantities] = useState(['']);

  const handleAddQuantity = () => {
    setQuantities([...quantities, '']);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleSubmit = () => {
    const newItem = {
      code,
      name,
      quantity: quantities
        .map((qty) => Number(qty))
        .filter((qty) => !isNaN(qty) && qty > 0)
    };
    onAdd(newItem);
    handleClose();
  };

  const handleClose = () => {
    // Reset the form
    setCode('');
    setName('');
    setQuantities(['']);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-4'>Add New Item</h2>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Code
          </label>
          <input
            type='text'
            placeholder='Code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
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

        {quantities.map((quantity, index) => (
          <div
            key={index}
            className='mb-4 flex'>
            <div className='flex-grow'>
              <input
                type='number'
                placeholder='Quantity'
                value={quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            {index === quantities.length - 1 && (
              <button
                onClick={handleAddQuantity}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'>
                +
              </button>
            )}
          </div>
        ))}

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

export default AddItemModal;
