'use client';
import React, { useEffect, useState } from 'react';
import ExcelReader from './ExcelReader';
import {
  useProductionProductStore,
  useProductionStore
} from '@/store/Production';
import AddModal from './AddModal';
import { useProductsStore } from '@/store/ProductsStore';

interface MyData {
  aCode: string;
  quantity: number | null;
  date: string | Date | number;
}

function ProductionPage() {
  const [data, setData] = useState<MyData[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(true);

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
      console.log('products', products);
      setProducts(products);
      console.log('products form set', products);

      const data = await useProductionStore.getState().setProductsFromDB();
      console.log('production', data);

      data.map((row) => {
        row.date = formatDate(row.date) as unknown as string;
      });

      setData(data);
    };

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
            return (
              <React.Fragment key={index}>
                <tr>
                  <td className='border p-2'>{row.aCode}</td>
                  <td className='border p-2'>{row.quantity}</td>
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
