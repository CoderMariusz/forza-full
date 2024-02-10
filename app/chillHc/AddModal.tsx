import { RmMaterial } from '@/store/RmMaterials';
import React, { useState, useEffect } from 'react';

function AddRMItemModal({
  isOpen,
  onClose,
  onAdd,
  rmMaterials
}: {
  rmMaterials: RmMaterial[];
  isOpen: boolean;
  onClose: any;
  onAdd: any;
}) {
  const [rmCode, setRmCode] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const [ticketId, setTicketId] = useState('');

  // Automatically set the name based on selected rmCode
  const [name, setName] = useState(''); // Declare the setName function using the useState hook

  useEffect(() => {
    const selectedMaterial = rmMaterials.find(
      (material) => material.rmCode === rmCode
    );
    if (selectedMaterial) {
      setName(selectedMaterial.name); // Automatically set name based on rmCode selection
    }
  }, [rmCode, rmMaterials]);

  const handleSubmit = () => {
    const newItem = {
      rmCode,
      name: name, // Set name based on rmCode selection
      date,
      ticketId: ticketId,
      weight: parseFloat(weight) // Parse weight as a float
    };

    onAdd(newItem);
    handleClose();
  };

  const handleClose = () => {
    // Reset the form
    setRmCode('');
    setName('');
    setDate('');
    setTicketId('');
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
          <select
            value={rmCode}
            onChange={(e) => setRmCode(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            <option value=''>Select RM Code</option>
            {rmMaterials.map((material) => (
              <option
                key={material.rmCode}
                value={material.rmCode}>
                {material.rmCode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            value={name}
            disabled
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Ticket ID
          </label>
          <input
            type='text'
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

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

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Weight
          </label>
          <input
            type='number'
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
