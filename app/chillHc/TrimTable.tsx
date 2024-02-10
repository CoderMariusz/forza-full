import useTrimState from '@/store/Trim';
import { log } from 'console';
import React, { use, useEffect, useState } from 'react';
import { TrimObject } from '@/store/Trim';
import { useUserStore } from '@/store/UserStore';

interface TrimTableProps {
  isLoggedIn: boolean;
  trim: TrimObject[];
  setTrim: (trim: any) => void;
}

const TrimTable: React.FC<TrimTableProps> = ({ isLoggedIn, trim, setTrim }) => {
  const [newKg, setNewKg] = useState('');
  const user = useUserStore.getState().name;
  const [newDate, setNewDate] = useState('');
  const [selectedName, setSelectedName] = useState<string>();

  const groupedData = trim.reduce((acc: any, item: TrimObject) => {
    acc[item.name] = acc[item.name] || [];
    acc[item.name].push(item);
    return acc;
  }, {});

  const trimNames = [
    'Ham 600g',
    'Cornedbeef 400g',
    'Chicken 180g',
    'Beef 180g',
    'Stuffed Chicken 180g'
  ];

  const handleNewRecord = async () => {
    if (newKg && newDate && selectedName) {
      const newItem = {
        name: selectedName,
        date: newDate,
        kg: parseInt(newKg)
      };

      const addItem = await useTrimState.getState().addTrimToDB(newItem);

      try {
        setTrim((trim: any) => [...trim, { ...newItem, id: addItem.$id }]);
        setNewKg('');
        setNewDate('');
        setSelectedName('');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Delete item with id:', id);

    // Find the index of the item to delete based on the id
    const item = await useTrimState.getState().removeTrimFromDB(id);
    const NewArray = trim.filter((item) => item.id !== id);
    setTrim(NewArray);
  };

  return (
    <div className='container mx-auto'>
      {user === 'process@forzafoods.com' ? (
        <div className='mt-4'>
          <input
            type='text'
            value={newKg}
            onChange={(e) => setNewKg(e.target.value)}
            placeholder='Enter kg'
            className='border px-4 py-2 mr-2'
          />
          <input
            type='date'
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder='Enter date'
            className='border px-4 py-2 mr-2'
          />
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className='border px-4 py-2'>
            <option value=''>Select Name</option>
            {trimNames.map((trim: string, index: number) => (
              <option
                key={index}
                value={trim}>
                {trim}
              </option>
            ))}
          </select>
          <button
            onClick={handleNewRecord}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2'>
            Add KG
          </button>
        </div>
      ) : null}
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Kg</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((name, index) => (
            <>
              <tr key={name}>
                <td className='border px-4 py-2'>{name}</td>
                <td className='border px-4 py-2'>
                  {groupedData[name].map((item: TrimObject, index: number) => (
                    <div
                      key={item.id}
                      className='py-2'>
                      {item.date}
                    </div>
                  ))}
                </td>
                <td className='border px-4 py-2'>
                  {groupedData[name].map((item: TrimObject, index: number) => (
                    <div
                      key={item.id}
                      className='py-2'>
                      {item.kg}
                    </div>
                  ))}
                </td>
                <td className='border px-4 py-2 flex flex-col'>
                  {user === 'process@forzafoods.com' &&
                    groupedData[name].map((item: TrimObject, index: number) => (
                      <button
                        key={item.id}
                        onClick={() => handleDelete(item.id)}
                        className=' border-gray-300 hover:border-red-500 border-2 text-gray-400 hover:text-red-600 transition-all duration-200 font-bold py-1 px-2 ml-2 mb-2 rounded-lg'>
                        delete
                      </button>
                    ))}
                </td>
              </tr>
              <tr className='border'>
                <td>Total: </td>
                <td>
                  {groupedData[name].reduce((acc: number, item: TrimObject) => {
                    return acc + item.kg;
                  }, 0)}{' '}
                  kg
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrimTable;
