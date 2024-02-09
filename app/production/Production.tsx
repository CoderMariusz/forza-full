import React from 'react';

interface MyData {
  aCode: string;
  quantities: number | null;
  date: string | Date | number;
}

function Production({ sortedData }: { sortedData: MyData[] }) {
  return (
    <table className='min-w-full bg-white divide-y divide-gray-200'>
      <thead className='bg-gray-800 text-white'>
        <tr>
          <th className='py-2'>A-Code</th>
          <th className='py-2'>quantities</th>
          <th className='py-2'>Date</th>
        </tr>
      </thead>
      <tbody className='text-gray-700'>
        {sortedData.map((row: MyData, index: any) => {
          return (
            <React.Fragment key={index}>
              <tr>
                <td className='border p-2'>{row.aCode}</td>
                <td className='border p-2'>{row.quantities}</td>
                <td className='border p-2'>
                  {row.date instanceof Date
                    ? row.date.toLocaleDateString()
                    : String(row.date)}
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default Production;
