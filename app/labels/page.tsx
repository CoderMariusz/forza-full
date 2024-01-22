'use client';
import React, { use, useEffect, useState } from 'react';
import LabelsList from './LabelsList';
import AddModal from './AddModal';
import { Labels, useLabels, useLabelsStore } from '@/store/LabelsStore';

function LabelPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [labels, setLabels] = useLabelsStore((state) => [
    state.labels ? state.labels : [],
    state.setLabels
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLabels(await useLabelsStore.getState().setLabelsFromDB());
    };
    // This can be replaced by an API call or other logic to fetch the labels
    fetchData();
  }, []);

  const handleClose = () => {
    setIsAddModalOpen(false);
  };

  const filteredLabels =
    labels && labels.filter((label) => label.code?.includes(searchQuery));

  const onAddLabel = async (newLabel: Labels) => {
    setLabels([...labels, newLabel]);
    try {
      await useLabels.getState().createLabel(newLabel);
    } catch (error) {
      console.log(error);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Labels</h1>
      <hr className='mb-4' />
      <div className='mb-4 flex justify-between'>
        <input
          type='text'
          placeholder='Search by Code...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Add Label +
        </button>
      </div>
      <LabelsList labels={filteredLabels} />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleClose}
        onAdd={onAddLabel}
        existingLabels={labels}
      />
    </div>
  );
}

export default LabelPage;
