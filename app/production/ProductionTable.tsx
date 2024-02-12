import { NewPlanningItem } from '@/store/Production';
import React, { useState } from 'react';

type ProductionData = {
  line: number;
  startTime: number;
  productionTime: number;
  finishTime: number;
  code: string;
  productName: string;
  quantity: number;
};

type ProductionTableProps = {
  productionData: ProductionData[];
};

// Helper function to convert decimal hours to HH:MM format
const decimalToTime = (decimal: number): string => {
  const hours = Math.floor(decimal * 24);
  const minutes = Math.round((decimal * 1440) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

const ProductionTable: React.FC<ProductionTableProps> = ({
  productionData
}) => {
  const [filter, setFilter] = useState<number>(0);

  const handleFilterChange = (line: number) => {
    setFilter(line);
  };
  console.log('productionData', productionData);
  const filteredData = filter
    ? productionData.filter((data) => data.line === filter)
    : productionData;

  const lineNumbers = Array.from(
    new Set(productionData.map((data) => data.line))
  );

  return (
    <div className='overflow-x-auto'>
      <div className='flex justify-start space-x-2 mb-4'>
        <button
          onClick={() => handleFilterChange(0)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
          All Lines
        </button>
        {lineNumbers.map((line) => (
          <button
            key={line}
            onClick={() => handleFilterChange(line)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${
              filter === line ? 'bg-blue-700' : ''
            }`}>
            Line {line}
          </button>
        ))}
      </div>

      <table className='table-auto w-full text-left whitespace-no-wrap'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>
              Line
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Start Time
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Production Time
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Finish Time
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Code
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Product Name
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className='border-b'>
              <td className='px-4 py-2'>{item.line}</td>
              <td className='px-4 py-2'>{decimalToTime(item.startTime)}</td>
              <td className='px-4 py-2'>
                {decimalToTime(item.productionTime)}
              </td>
              <td className='px-4 py-2'>{decimalToTime(item.finishTime)}</td>
              <td className='px-4 py-2'>{item.code}</td>
              <td className='px-4 py-2'>{item.productName}</td>
              <td className='px-4 py-2'>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTable;
