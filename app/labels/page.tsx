import React, { useState, useEffect } from 'react';
import AddLabelModal from './AddModal'; // Adjust the path as needed
import { LabelItem } from '@/store/LabelsStore';

const LabelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [labelsData, setLabelsData] = useState<LabelItem[]>([]);

  // Dummy fetch function, replace with actual data fetching logic
  const fetchLabelsData = async (): Promise<LabelItem[]> => {
    // Simulate an async data fetch
    return Promise.resolve([
      { code: '001', name: 'Label A', group: 'Group 1' },
      { code: '002', name: 'Label B', group: 'Group 2' }
    ]);
  };

  useEffect(() => {
    fetchLabelsData().then(setLabelsData);
  }, []);

  const handleAddNewLabel = (newLabel: LabelItem) => {
    setLabelsData([...labelsData, newLabel]);
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddLabelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={handleAddNewLabel}
      />
    </div>
  );
};

export default LabelsPage;
