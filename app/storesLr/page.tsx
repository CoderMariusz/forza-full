'use client';
import { useUserStore } from '@/store/UserStore';
import React, { use, useState } from 'react';

// Definicja typu dla produktów
interface Product {
  code: string;
  name: string;
  supplier: string;
  supplierCode: string;
  location: string;
  quantity: number;
  deliveryDate?: string; // Opcjonalne tylko dla RM Stock
  expirationDate?: string; // Opcjonalne tylko dla RM Stock
}

// Przykładowe dane produktów
const dryGoodsSample: Product[] = [
  {
    code: 'DG001',
    name: 'Rice',
    supplier: 'Global Foods',
    supplierCode: 'GF100',
    location: 'Warehouse 1',
    quantity: 120
  },
  {
    code: 'DG002',
    name: 'Pasta',
    supplier: 'Italian Foods',
    supplierCode: 'IF200',
    location: 'Warehouse 2',
    quantity: 90
  },
  {
    code: 'DG003',
    name: 'Canned Beans',
    supplier: 'Farm Fresh',
    supplierCode: 'FF300',
    location: 'Warehouse 1',
    quantity: 150
  }
];

const rmStockSample: Product[] = [
  {
    code: 'RM001',
    name: 'Flour',
    supplier: 'Bakery Supplies',
    supplierCode: 'BS100',
    location: 'Warehouse 3',
    quantity: 200,
    deliveryDate: '2024-01-15',
    expirationDate: '2024-06-01'
  },
  {
    code: 'RM002',
    name: 'Sugar',
    supplier: 'Sweet Tooth Inc.',
    supplierCode: 'ST200',
    location: 'Warehouse 4',
    quantity: 100,
    deliveryDate: '2024-02-20',
    expirationDate: '2024-08-15'
  },
  {
    code: 'RM003',
    name: 'Olive Oil',
    supplier: 'Gourmet Imports',
    supplierCode: 'GI300',
    location: 'Warehouse 5',
    quantity: 50,
    deliveryDate: '2024-03-10',
    expirationDate: '2025-03-09'
  }
];

const dryGoodsColumns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'supplierCode', label: 'Supplier Code' },
  { key: 'location', label: 'Location' },
  { key: 'quantity', label: 'Quantity' }
];

const rmStockColumns = [
  ...dryGoodsColumns,
  { key: 'deliveryDate', label: 'Delivery Date' },
  { key: 'expirationDate', label: 'Expiration Date' }
];

const StoresPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'drygoods' | 'rmstock'>('drygoods');
  const user = useUserStore((state) => state.name);

  const filteredDryGoods = dryGoodsSample.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredRmStock = rmStockSample.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className='flex justify-center items-center text-2xl font-bold'>
        <div className='w-1/2 h-1/2 bg-gray-200 rounded-lg p-4'>
          <h1 className='text-center'>You are not allowed to see this page</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <input
        type='text'
        placeholder='Search for products...'
        className='p-2 border rounded'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr />
      <div className='transition-all duration-300'>
        <button
          className='text-xl font-bold mr-4 p-3 hover:bg-blue-300 transition-all duration-300'
          onClick={() => setView('drygoods')}>
          Dry Goods
        </button>
        <button
          className='text-xl font-bold mr-4 p-3 hover:bg-blue-300 transition-all duration-300'
          onClick={() => setView('rmstock')}>
          RM Stock
        </button>
      </div>
      <hr />
      <div className='w-full'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              {(view === 'drygoods' ? dryGoodsColumns : rmStockColumns).map(
                ({ key, label }) => (
                  <th
                    key={key}
                    className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {(view === 'drygoods' ? filteredDryGoods : filteredRmStock).map(
              (product) => (
                <tr key={product.code}>
                  {(view === 'drygoods' ? dryGoodsColumns : rmStockColumns).map(
                    ({ key }) => (
                      <td
                        key={`${product.code}-${key}`}
                        className='px-5 py-3 border-b border-gray-200 bg-white text-sm'>
                        {product[key as keyof Product]}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresPage;
