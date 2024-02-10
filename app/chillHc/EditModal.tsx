import React, { useState, useEffect } from 'react';

function EditRMItemModal({
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
  const [data, setData] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (item) {
      setData(item.date); // Initialize data field with item's date
      setWeight(item.weight.toString()); // Initialize weight field with item's weight
      setName(item.name); // Initialize ticketNumber field with item's ticketNumber
      setTicketId(item.ticketId);
    }
  }, [item]);

  const handleSubmit = () => {
    const updatedItem = {
      ...item,
      date: data,
      weight: parseFloat(weight),
      name: name,
      ticketId: ticketId
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
            RM-Code (Read Only)
          </label>
          <input
            type='text'
            value={item.rmCode}
            readOnly
            disabled
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            value={name}
            readOnly
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  bg-gray-100'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Ticket Id
          </label>
          <input
            type='text'
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Date
          </label>
          <input
            type='date'
            value={data}
            onChange={(e) => setData(e.target.value)}
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

export default EditRMItemModal;
