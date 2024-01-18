'use client';
import { useStoresHcStore } from '@/store/StoresHc';
import { useUserStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';
import { StoresHcObject } from '@/store/StoresHc';
import AddModal from './AddModal';
import * as XLSX from 'xlsx';

function StoresHc() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<StoresHcObject[]>([]);
  const [user] = useUserStore((state) => [state.name]);
  const [loadDataDB, addStoresHcToDB] = useStoresHcStore((state) => [
    state.loadStoresHcFromDB,
    state.addStoresHcToDB
  ]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const exportToExcel = () => {
    const processedData = data.map((item) => ({
      ...item,
      quantity: item.quantity.join(', ') // Convert array to comma-separated string
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(processedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'DataExport.xlsx');
  };

  const loadData = async () => {
    const data = await loadDataDB();
    setData(data);
  };

  useEffect(() => {
    loadData().then(() => {
      setLoading(true);
    });
  }, [loading]);

  const filteredData = data.filter(
    (item) =>
      item.code.includes(searchQuery) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortByCode = (data: any) => {
    return data.sort((a: StoresHcObject, b: StoresHcObject) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    });
  };

  const addObject = (newObject: StoresHcObject) => {
    setData([...data, newObject]);
    addStoresHcToDB(newObject);
    console.log(data);
  };

  const sortedData = sortByCode(filteredData);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Store Items</h1>
      <hr className='mb-4' />

      <div className='mb-4 flex justify-between'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
        />
        {user === 'storeshc@forzafoods.com' && (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Web +
          </button>
        )}
      </div>

      {!loading && (
        <h3>
          <i className='fas fa-spinner fa-spin w-10 h-10 bg-red-200'></i>
          <span className='px-3'>Loading...</span>
        </h3>
      )}

      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>Code</th>
            <th className='py-3 px-6 text-left'>Name</th>
            <th className='py-3 px-6 text-center'>Quantity</th>
            {user === 'storeshc@forzafoods.com' && (
              <th className='py-3 px-6 text-center'>Actions</th>
            )}
          </tr>
        </thead>

        <tbody className='text-gray-600 text-sm font-light'>
          {sortedData &&
            sortedData.map((item: StoresHcObject, index: number) => (
              <tr
                key={index}
                className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {item.code}
                </td>
                <td className='py-3 px-6 text-left'>{item.name}</td>
                <td className='py-3 px-6 text-center'>
                  {item.quantity.join(', ')}
                </td>
                {user === 'storeshc@forzafoods.com' && (
                  <td className='py-3 px-6 text-center'>
                    <button
                      onClick={() => alert('change quantity')}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                      change
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <AddModal
        isOpen={isOpen}
        onClose={setIsOpen}
        onAdd={addObject}
      />
      <div>
        <button
          onClick={exportToExcel}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default StoresHc;