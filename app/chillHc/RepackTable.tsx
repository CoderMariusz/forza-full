import React from 'react';

import { ChillHcObject } from '@/store/ChillHc';

interface RepackTableProps {
  data: ChillHcObject[];
  user: string;
  setItem: (item: ChillHcObject) => void;
  setIsOpenChange: (isOpen: boolean) => void;
  removeObject: (id: string) => void;
}

const RepackTable: React.FC<RepackTableProps> = ({
  data,
  user,
  setItem,
  setIsOpenChange,
  removeObject
}) => {
  return (
    <table>
      <thead>
        <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
          <th className='py-3 px-6 text-left'>RM-Code</th>
          <th className='py-3 px-6 text-left'>Ticket Id</th>
          <th className='py-3 px-6 text-left'>Date</th>
          <th className='py-3 px-6 text-left'>Weight</th>
          {user === 'process@forzafoods.com' ? (
            <th className='py-3 px-6 text-left'>Actions</th>
          ) : null}
        </tr>
      </thead>
      <tbody className='text-gray-600 text-sm font-light'>
        {data.map((item: ChillHcObject, index: number) => (
          <tr
            key={index}
            className='border-b border-gray-200 hover:bg-gray-100'>
            <td className='py-3 px-6 text-left whitespace-nowrap'>
              {item.rmCode}
            </td>
            <td className='py-3 px-6 text-left whitespace-nowrap'>
              {item.name}
            </td>
            <td className='py-3 px-6 text-left'>{item.date}</td>
            <td className='py-3 px-6 text-left'>{item.weight}</td>
            {user === 'process@forzafoods.com' ? (
              <td className='py-3 px-6 text-left'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={() => {
                    console.log('edit');
                    console.log(item);

                    setItem(item);
                    setIsOpenChange(true);
                  }}>
                  Edit
                </button>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2'
                  onClick={() => removeObject(item.id)}>
                  Delete
                </button>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RepackTable;
