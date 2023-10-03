'use client';
import React, { useEffect, useState } from 'react';
import ExcelReader from './ExcelReader';
import { useProductionStore } from '@/store/Production';

interface MyData {
  aCode: string;
  quantity: number | null;
  date: number;
}

function ProductionPage() {
  const [data, setData] = useState<MyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await useProductionStore.getState().setProductsFromDB();
      setData(data);
    };

    fetchData();
  }, [data]);

  const sortedData = [...data].sort(
    (a: MyData, b: MyData) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  function excelDateToJSDate(serial: number) {
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899 (the 0-based month is 11)
    const excelEpochAsUnixTimestamp = excelEpoch.getTime();
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const serialDateAsUnixTimestamp = serial * millisecondsInADay;
    const correctDateAsUnixTimestamp =
      excelEpochAsUnixTimestamp + serialDateAsUnixTimestamp;

    return new Date(correctDateAsUnixTimestamp);
  }

  return (
    <div className='w-full my-4'>
      <div>
        <h1 className='text-3xl font-bold mb-1'>Production</h1>
        <ExcelReader setData={setData} />
      </div>
      <hr className='mb-4' />

      <table className='min-w-full bg-white divide-y divide-gray-200'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='py-2'>A-Code</th>
            <th className='py-2'>Quantity</th>
            <th className='py-2'>Date</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {sortedData.map((row: MyData, index) => {
            const date = new Date(excelDateToJSDate(row.date));
            const formedDate = `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;

            return (
              <React.Fragment key={index}>
                <tr>
                  <td className='border p-2'>{row.aCode}</td>
                  <td className='border p-2'>{row.quantity}</td>
                  <td className='border p-2'>{formedDate}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductionPage;
