import React from 'react';
import { Labels } from '@/store/LabelsStore';

function LabelsList({ labels }: { labels: Labels[] }) {
  return (
    <div className='flex flex-col my-4 w-full mx-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-200'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='py-2'>Group</th>
            <th className='py-2'>Code</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {labels?.map((label) => (
            <tr key={label.code}>
              <td className='border p-2'>{label.group}</td>
              <td className='border p-2'>{label.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LabelsList;
