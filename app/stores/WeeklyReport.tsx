import React, { useState } from 'react';
interface ReportItem {
  aCode: string;
  labelCode: string;
  startQuantity: number;
  quantityAfterProduction: number;
  endQuantity: number;
  wasted: number;
  week: number;
}

interface WeeklyReportProps {
  data: {
    week: number;
    production: ReportItem[];
  }[];
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ data }) => {
  const [activeWeek, setActiveWeek] = useState<number>(data[0]?.week || 0); // default to the first week

  // Extract production data for the active week
  const activeWeekData =
    data.find((weekData) => weekData.week === activeWeek)?.production || [];

  return (
    <div className='w-full'>
      {/* Bookmarks for Weeks */}
      <div className='mb-4 flex space-x-4'>
        {data.map((weekData, idx) => (
          <button
            key={idx}
            onClick={() => setActiveWeek(weekData.week)}
            className={`py-1 px-3 ${
              weekData.week === activeWeek
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}>
            Week {weekData.week}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className='w-full text-center'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='py-2'>A-Code</th>
            <th className='py-2'>Label Code</th>
            <th className='py-2'>Start Quantity</th>
            <th className='py-2'>Quantity After Production</th>
            <th className='py-2'>End Quantity</th>
            <th className='py-2'>Difference (%)</th>
          </tr>
        </thead>
        <tbody>
          {activeWeekData.map((item, index) => {
            return (
              <tr
                key={index}
                className={`${
                  item.quantityAfterProduction < 0
                    ? 'bg-red-600 text-yellow-100'
                    : 'bg-gray-100'
                }`}>
                <td className='py-2'>{item.aCode}</td>
                <td>{item.labelCode}</td>
                <td>{item.startQuantity}</td>
                <td>{item.quantityAfterProduction}</td>
                <td>{item.endQuantity}</td>
                <td>{item.wasted.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyReport;
