'use client';
import React, { useState, useEffect } from 'react';
import { Labels } from '@/store/LabelsStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (label: Labels) => void;
  existingLabels: Labels[];
}

const AddModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAdd,
  existingLabels
}) => {
  const [group, setGroup] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const existingLabel = existingLabels.find((label) => label.code === code);
    if (existingLabel) {
      // If yes, set an error message
      setError('Label Code needs to be unique');
      return;
    }
    setError(null);

    onAdd({
      group,
      code,
      createdAt: new Date().toISOString()
    }); // Adjust id and createdAt accordingly.
    setGroup('');
    setCode('');
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded p-8 m-4 max-w-xs mx-auto'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>Add Label</h2>

        {error && <div className='mb-4 text-red-500'>{error}</div>}

        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='group'>
            Group
          </label>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className='w-full p-2 border rounded'>
            <option value=''>Select Group</option>
            {['top', 'bottom', 'sticker'].map((g) => (
              <option
                key={g}
                value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='code'>
            Code
          </label>
          <input
            type='text'
            id='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>

        <button
          onClick={handleSubmit}
          className='w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700'>
          Add Label
        </button>

        <button
          onClick={onClose}
          className='w-full p-2 bg-red-600 text-white rounded hover:bg-red-700'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddModal;
