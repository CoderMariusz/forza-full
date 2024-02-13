// Import React and other necessary elements
'use client';
import React, { useEffect, useState } from 'react';
import AddRmMaterialModal from './AddRmMaterialModal'; // You'll create this modal component
import {
  NewRmMaterial,
  RmMaterial,
  useRmMaterialsStore
} from '@/store/RmMaterials'; // Adjust the import paths according to your project structure
import { useUserStore } from '@/store/UserStore';

const RmMaterialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rmData, setRmData] = useState<RmMaterial[]>([]);
  const user = useUserStore((state) => state.name);

  const filteredData =
    rmData &&
    rmData.filter(
      (data) =>
        data.rmCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.supCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) // If you want to search by name as well
    );

  const handleAddNewRmMaterial = async (newItem: NewRmMaterial) => {
    const newI = await useRmMaterialsStore.getState().AddNewRmMaterial(newItem);
    if (newI) {
      setLoading(!loading);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await useRmMaterialsStore.getState().loadRmMaterialsFromDB();
      setRmData(data);
    };
    fetchData();
    setLoading(false);
  }, [loading]);

  if (user === '' || user === undefined) {
    return <div>Not authorized</div>;
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-xl font-bold text-center my-4'>RM Materials</h1>
      <hr />
      <div className='flex justify-between items-center my-4'>
        <input
          type='text'
          placeholder='Enter RM code or supplier code'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-grow mr-4 p-2 border border-gray-300 rounded max-w-xs'
        />
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add New RM Material
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>RM Code</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Supplier</th>
              <th className='px-4 py-2'>Supplier Code</th>
              <th className='px-4 py-2'>Additional Information</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rmData.length === 0 ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              filteredData.map((data, index) => (
                <tr
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  key={index}>
                  <td className='border px-4 py-2'>{data.rmCode}</td>
                  <td className='border px-4 py-2'>{data.name}</td>
                  <td className='border px-4 py-2'>{data.supplier}</td>
                  <td className='border px-4 py-2'>{data.supCode}</td>
                  <td className='border px-4 py-2'>
                    {data.additionalInfo || 'N/A'}
                  </td>
                  <td className='border px-4 py-2 '>
                    <button
                      onClick={() => {
                        // Handle edit
                      }}
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                    '
                      onClick={() => {
                        // Handle delete
                        useRmMaterialsStore
                          .getState()
                          .removeRmMaterial(data.$id);
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddRmMaterialModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(newItem) => handleAddNewRmMaterial(newItem)}
      />
    </div>
  );
};

export default RmMaterialsPage;
