'use client';
import { LabelItem, NewLabelItem } from '@/store/LabelsStore';
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: NewLabelItem) => void; // Use the LabelItem type for more precise typing
}

const AddLabelModal = ({ isOpen, onClose, onAdd }: Props) => {
  const [formData, setFormData] = useState<NewLabelItem>({
    code: '',
    name: '',
    group: ''
  });

  const inputFields = [
    { name: 'code', placeholder: 'Code' },
    { name: 'name', placeholder: 'Name' },
    { name: 'group', placeholder: 'Group' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof LabelItem
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleAdd = () => {
    onAdd(formData);
    onClose(); // Close modal after adding
    setFormData({ code: '', name: '', group: '' }); // Reset form data
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-sm w-full'>
        <h2 className='text-lg font-semibold mb-4'>Add New Label</h2>
        {inputFields.map((field) =>
          field.name === 'group' ? (
            <select
              key={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={(e) =>
                handleChange(e as any, field.name as keyof LabelItem)
              }
              className='mb-4 p-2 border border-gray-300 rounded w-full'>
              <option value=''>Select a group</option>
              <option value='top'>Top</option>
              <option value='bottom'>Bottom</option>
              <option value='sticker'>Sticker</option>
            </select>
          ) : (
            <input
              key={field.name}
              type='text'
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={(e) => handleChange(e, field.name as keyof LabelItem)} // Fix: Cast field.name to keyof LabelItem
              className='mb-4 p-2 border border-gray-300 rounded w-full'
            />
          )
        )}
        <div className='flex justify-end gap-2'>
          <button
            onClick={handleAdd}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            Add
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-700/80'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLabelModal;
