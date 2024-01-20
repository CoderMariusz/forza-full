import React, { useState } from 'react';

function Webs() {
  const [webs, setWebs] = useState([
    // Dummy data, replace with your actual data
    { code: 'web001', name: 'First Web' },
    { code: 'web002', name: 'Second Web' }
    // ... more webs
  ]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Webs</h1>
      <hr className='mb-4' />

      <table className='min-w-full table-auto'>
        <thead className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
          <tr>
            <th className='py-3 px-6 text-left'>Web Code</th>
            <th className='py-3 px-6 text-left'>Name</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {webs.map((web, index) => (
            <tr
              key={index}
              className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-6 text-left whitespace-nowrap'>
                {web.code}
              </td>
              <td className='py-3 px-6 text-left'>{web.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Webs;
