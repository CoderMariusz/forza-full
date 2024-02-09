import { LabelItem } from '@/store/LabelsStore';
import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LabelItem) => void; // Renamed from onAdd for clarity, since it now handles both adding and editing
  labelToEdit?: LabelItem; // Optional property for editing
}

const EditLabelModal = ({ isOpen, onClose, onSubmit, labelToEdit }: Props) => {
  const [formData, setFormData] = useState<LabelItem>({
    $id: '',
    code: '',
    name: '',
    group: ''
  });

  useEffect(() => {
    // Populate form data if labelToEdit is provided
    if (labelToEdit) {
      setFormData(labelToEdit);
    } else {
      // Reset form data if no labelToEdit is provided (i.e., adding a new label)
      setFormData({
        $id: '', // Reset ID as well if managing ID in the form
        code: '',
        name: '',
        group: ''
      });
    }
  }, [labelToEdit, isOpen]); // Re-run effect when labelToEdit or isOpen changes

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof LabelItem
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose(); // Close modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-sm w-full'>
        <h2 className='text-lg font-semibold mb-4'>
          {labelToEdit ? 'Edit Label' : 'Add New Label'}
        </h2>
        {formData && (
          <>
            <h3 className='text-xl font-bold'>{labelToEdit?.code}</h3>
            <hr className='mb-6 mt-1' />
            <input
              key='name'
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) => handleChange(e, 'name')}
              className='mb-4 p-2 border border-gray-300 rounded w-full'
            />
            <input
              key='group'
              type='text'
              placeholder='Group'
              value={formData.group}
              onChange={(e) => handleChange(e, 'group')}
              className='mb-4 p-2 border border-gray-300 rounded w-full'
            />
          </>
        )}
        <div className='flex justify-end gap-2'>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            {labelToEdit ? 'Save Changes' : 'Add'}
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

export default EditLabelModal;
