'use client';
import React, { useEffect, useState } from 'react';
import AddWebModal from './AddModal';
import { WebTrays, useWebTraysStore } from '@/store/WebTrays';

const WebTraysPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webData, setWebData] = useState<WebTrays[]>([]);

  const filteredData = webData.filter(
    (data) =>
      data.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.supCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HandleAddNewWeb = async (newItem: WebTrays) => {
    console.log(newItem);

    const newI = await useWebTraysStore.getState().AddNewWeb(newItem);
    if (newI) {
      setLoading(true);
      setWebData([...webData, newI]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await useWebTraysStore.getState().loadWebTraysFromDB();
      setWebData(data);
    };
    fetchData();
  }, [loading]);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-xl font-bold text-center my-4'>Webs & Trays</h1>
      <hr />
      <div className='flex justify-between items-center my-4'>
        <input
          type='text'
          placeholder='enter web code'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-grow mr-4 p-2 border border-gray-300 rounded max-w-xs'
        />
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add New Web
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>Code</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Supplier</th>
              <th className='px-4 py-2'>Sup. Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                key={index}>
                <td className='border px-4 py-2'>{data.code}</td>
                <td className='border px-4 py-2'>{data.name}</td>
                <td className='border px-4 py-2'>{data.supplier}</td>
                <td className='border px-4 py-2'>{data.supCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddWebModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(newItem) => HandleAddNewWeb(newItem)}
      />
    </div>
  );
};

export default WebTraysPage;
