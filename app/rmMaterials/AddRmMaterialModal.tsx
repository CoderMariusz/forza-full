import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void; // Consider specifying the type more precisely than 'any' if possible
}

// Modal Component for RMMaterials
const AddRmMaterialModal = ({ isOpen, onClose, onAdd }: Props) => {
  const [formData, setFormData] = useState({
    rmCode: '',
    name: '',
    supplier: '',
    supCode: '', // Adjusted from supCode to supplierCode
    additionalInfo: '' // Adjusted from additionalInfo
  });

  const inputFields = [
    { name: 'rmCode', placeholder: 'RM Code' }, // Adjusted placeholder for clarity
    { name: 'name', placeholder: 'Name' },
    { name: 'supplier', placeholder: 'Supplier' },
    { name: 'supCode', placeholder: 'Supplier Code' }, // Adjusted to match the state key
    { name: 'additionalInfo', placeholder: 'Additional Information' } // Adjusted to match the state key
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleAdd = () => {
    console.log('Adding new RM Material', formData);

    onAdd(formData);

    onClose(); // Close modal after adding
    // Reset form data
    setFormData({
      rmCode: '',
      name: '',
      supplier: '',
      supCode: '',
      additionalInfo: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-sm w-full'>
        <h2 className='text-lg font-semibold mb-4'>Add New RM Material</h2>
        {inputFields.map((field) => (
          <input
            key={field.name}
            type='text'
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={(e) => handleChange(e, field.name)}
            className='mb-4 p-2 border border-gray-300 rounded w-full'
          />
        ))}
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

export default AddRmMaterialModal;
