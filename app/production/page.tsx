'use client';
import React, { useEffect, useState } from 'react';
import ExcelReader from './ExcelReader';
import {
  useProductionProductStore,
  useProductionStore
} from '@/store/Production';
import AddModal from './AddModal';
import { useProductsStore } from '@/store/ProductsStore';
import Production from './Production';
import Available from './Available';
import {
  WeeklyProductionRow,
  useWeeklyReportStore
} from '@/store/WeeklyReportStore';

interface MyData {
  aCode: string;
  quantity: number | null;
  date: string | Date | number;
}

// Define a type for the labelMap object
type LabelMap = {
  [labelCode: string]: {
    count: number;
    totalWaste: number;
    labelId: string;
  };
};

function ProductionPage() {
  const [data, setData] = useState<MyData[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [Bookmark, setBookmark] = useState(0);
  const [availableData, setAvailableData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<any[]>([]);

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
      const products = await useProductsStore.getState().setProductsFromDB();

      setProducts(products);

      const production = await useProductionStore
        .getState()
        .setProductsFromDB();

      const weeklyReport = await useWeeklyReportStore
        .getState()
        .setWeeklyReportFromDBinRow();

      production.map((row) => {
        row.date = formatDate(row.date) as unknown as string;
      });

      setData(production);
      setAvailableData(weeklyReport);
    };

    console.log('ava', availableData);
    fetchData();
  }, []);

  const sortedData = [...data].sort((a: MyData, b: MyData) => {
    const getDateTimestamp = (input: string | Date): number => {
      if (typeof input === 'string') {
        // Convert "DD/MM/YYYY" to "YYYY/MM/DD" and return the timestamp
        return new Date(input.split('/').reverse().join('/')).getTime();
      } else {
        // Return the timestamp of the Date object
        return input.getTime();
      }
    };

    if (typeof a.date === 'number' && typeof b.date === 'number') {
      return a.date - b.date;
    } else if (typeof a.date === 'number') {
      return -1; // Consider numbers as smaller
    } else if (typeof b.date === 'number') {
      return 1; // Consider numbers as smaller
    } else {
      const dateA = getDateTimestamp(a.date);
      const dateB = getDateTimestamp(b.date);
      return dateA - dateB;
    }
  });

  const onAdd = (production: {
    aCode: string;
    quantity: number;
    date: Date;
  }) => {
    console.log(production);
    setData([...data, production]);
    useProductionProductStore.getState().createProduct(production);
  };

  function processData(data: WeeklyProductionRow[]): any {
    const labelMap: LabelMap = {};

    // Loop through each data entry
    data.forEach((entry) => {
      const { labelCode, wasted, labelId } = entry;

      // Check if the labelCode exists in the labelMap
      if (!labelMap[labelCode]) {
        labelMap[labelCode] = {
          count: 0,
          totalWaste: 0,
          labelId: labelId!
        };
      }

      // Increment the count for this labelCode
      labelMap[labelCode].count += 1;

      // Add to the total waste for this labelCode
      labelMap[labelCode].totalWaste += wasted;
    });

    // Convert the labelMap to the desired array format
    const result = [];
    for (const labelCode in labelMap) {
      const { count, totalWaste, labelId } = labelMap[labelCode];
      const avgWaste = totalWaste / count;

      result.push({
        labelCode,
        timesProduced: count,
        averageWaste: avgWaste.toFixed(2),
        labelId
      });
    }

    return result;
  }

  const changeStoresBookmark = (number: number) => {
    if (number >= 0 && number <= 3) {
      setBookmark(number);
    } else {
      console.warn('Invalid bookmark number');
    }
  };

  return (
    <div className='w-full my-4'>
      <div className='flex flex-col pl-3'>
        <h1 className='text-3xl font-bold mb-1'>Production</h1>
        <ExcelReader
          setData={setData}
          dataFromPage={data}
        />
        <button
          onClick={() => setModalOpen(true)}
          className='bg-blue-600 w-48 text-white p-2 rounded hover:bg-blue-700'>
          Add Production
        </button>
      </div>
      <hr className='mb-4' />
      <div className='flex bg-slate-100 mb-2 rounded-md'>
        <button
          className='p-3 font-bold hover:bg-blue-300 transition-all duration-200 border-r-2 rounded-tl-md rounded-bl-md'
          onClick={() => changeStoresBookmark(0)}>
          Production
        </button>
        <button
          className='p-3 px-4 font-bold hover:bg-blue-300 transition-all duration-200 border-r-2'
          onClick={() => changeStoresBookmark(1)}>
          Available to produce.
        </button>
      </div>
      {(() => {
        switch (Bookmark) {
          case 0: {
            console.log('sortedData', sortedData);

            return <Production sortedData={sortedData} />;
          }

          case 1: {
            if (availableData.length > 0 && processedData.length === 0) {
              const processedData = processData(availableData);
              console.log('processedData', processedData);

              setProcessedData(processedData);
            }

            return <Available data={processedData} />;
          }

          default:
            return <Production sortedData={sortedData} />;
        }
      })()}

      <AddModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
        products={products}
      />
    </div>
  );
}

export default ProductionPage;
