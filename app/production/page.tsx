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

  function formatDate(inputStr: string | number | Date) {
    const date = new Date(inputStr); // create a Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    console.log('useEffect');

    const fetchData = async () => {
      const data = await useProductionStore.getState().setProductsFromDB();
      console.log('production', data);

      data.map((row) => {
        row.date = formatDate(row.date) as unknown as number;
      });

      setData(data);
    };

    fetchData();
  }, []);

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
            const formedDate = date.getDay();

            return (
              <React.Fragment key={index}>
                <tr>
                  <td className='border p-2'>{row.aCode}</td>
                  <td className='border p-2'>{row.quantity}</td>
                  <td className='border p-2'>{row.date}</td>
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
