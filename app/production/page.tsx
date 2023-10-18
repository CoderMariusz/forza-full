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
  date: string | Date;
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
    // Convert the date string from "DD/MM/YYYY" to "YYYY/MM/DD"
    const dateA =
      typeof a.date === 'string'
        ? new Date(a.date.split('/').reverse().join('/')).getTime()
        : a.date.getTime();
    const dateB =
      typeof b.date === 'string'
        ? new Date(b.date.split('/').reverse().join('/')).getTime()
        : b.date.getTime();

    return dateA - dateB;
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
        <ExcelReader setData={setData} />
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
                  <td className='border p-2'>{row.date.toString()}</td>
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
