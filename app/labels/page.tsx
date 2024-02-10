'use client';
import React, { useState, useEffect } from 'react';
import AddLabelModal from './AddModal'; // Adjust the path as needed
import { LabelItem, NewLabelItem, useLabelsStore } from '@/store/LabelsStore';
import EditLabelModal from './EditModal';

const LabelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [labelsData, setLabelsData] = useState<LabelItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editLabels, setEditLabels] = useState<LabelItem>();
  // Dummy fetch function, replace with actual data fetching logic
  const fetchLabelsData = async (): Promise<LabelItem[]> => {
    const data = await useLabelsStore.getState().loadLabelsFromDB();

    setLabelsData(data);
    return data;
  };

  useEffect(() => {
    fetchLabelsData().then(setLabelsData);
    setLoading(true);
  }, [loading]);

  const handleAddNewLabel = (newLabel: NewLabelItem) => {
    useLabelsStore.getState().addNewLabel(newLabel);
    setLoading(false);
  };

  const removeLabel = async (id: string) => {
    await useLabelsStore.getState().removeLabel(id);
    try {
      const newA = labelsData.filter((item) => item.$id !== id);
      setLabelsData(newA);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const updateLabel = async (newI: LabelItem) => {
    await useLabelsStore.getState().updateLabel(newI.$id, newI);
    try {
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredData = labelsData.filter(
    (label) =>
      label.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-xl font-bold text-center my-4'>Labels</h1>
      <hr />
      <div className='flex justify-between items-center my-4'>
        <input
          type='text'
          placeholder='Search by code, name, or group'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-grow mr-4 p-2 border border-gray-300 rounded max-w-xs'
        />
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add New Label
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>Code</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Group</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((label, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className='border px-4 py-2'>{label.code}</td>
                <td className='border px-4 py-2'>{label.name}</td>
                <td className='border px-4 py-2'>{label.group}</td>
                <td className='border py-1 flex justify-center'>
                  <button
                    className='mx-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700'
                    onClick={() => {
                      console.log(label);
                      setEditLabels(label);
                      setIsOpenEdit(true);
                    }}>
                    Edit
                  </button>
                  <button
                    className='px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700'
                    onClick={() => removeLabel(label.$id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditLabelModal
        labelToEdit={editLabels}
        onSubmit={(newI) => updateLabel(newI)}
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
      />

      <AddLabelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleAddNewLabel}
      />
    </div>
  );
};

export default LabelsPage;
