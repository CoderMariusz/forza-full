'use client';
import React, { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import { Product, useProductsStore } from '@/store/ProductsStore';
import AddModal from './AddModal';

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        name: 'Example Product 1',
        aCode: 'a-0001',
        $id: '123456',
        version: 1,
        web: 'flm2001',
        rates: 4.5,
        labels: [
          {
            group: 'top',
            code: 'flm1003',
            quantity: 12,
            id: 'label1',
            createdAt: '2023-09-29T00:00:00Z'
          },
          {
            group: 'bottom',
            code: 'flm1007',
            quantity: 8,
            id: 'label2',
            createdAt: '2023-09-29T01:00:00Z'
          },
          {
            group: 'sticker',
            code: 'flm1011',
            quantity: 19,
            id: 'label3',
            createdAt: '2023-09-29T02:00:00Z'
          }
        ]
      },
      {
        name: 'Example Product 2',
        aCode: 'a-0002',
        $id: '123457',
        version: 2,
        web: 'flm2002',
        rates: 3.7,
        labels: [
          {
            group: 'top',
            code: 'flm1015',
            quantity: 5,
            id: 'label4',
            createdAt: '2023-09-29T03:00:00Z'
          },
          {
            group: 'bottom',
            code: 'flm1020',
            quantity: 21,
            id: 'label5',
            createdAt: '2023-09-29T04:00:00Z'
          },
          {
            group: 'sticker',
            code: 'flm1012',
            quantity: 3,
            id: 'label6',
            createdAt: '2023-09-29T05:00:00Z'
          }
        ]
      },
      {
        name: 'Example Product 3',
        aCode: 'a-0003',
        $id: '123458',
        version: 1,
        web: 'flm2003',
        rates: 4.9,
        labels: [
          {
            group: 'top',
            code: 'flm1005',
            quantity: 15,
            id: 'label7',
            createdAt: '2023-09-29T06:00:00Z'
          },
          {
            group: 'bottom',
            code: 'flm1018',
            quantity: 11,
            id: 'label8',
            createdAt: '2023-09-29T07:00:00Z'
          },
          {
            group: 'sticker',
            code: 'flm1001',
            quantity: 7,
            id: 'label9',
            createdAt: '2023-09-29T08:00:00Z'
          }
        ]
      },
      {
        name: 'Example Product 4',
        aCode: 'a-0004',
        $id: '123459',
        version: 2,
        web: 'flm2004',
        rates: 4.0,
        labels: [
          {
            group: 'top',
            code: 'flm1022',
            quantity: 9,
            id: 'label10',
            createdAt: '2023-09-29T09:00:00Z'
          },
          {
            group: 'bottom',
            code: 'flm1003',
            quantity: 12,
            id: 'label11',
            createdAt: '2023-09-29T10:00:00Z'
          },
          {
            group: 'sticker',
            code: 'flm1007',
            quantity: 8,
            id: 'label12',
            createdAt: '2023-09-29T11:00:00Z'
          }
        ]
      },
      {
        name: 'Example Product 5',
        aCode: 'a-0005',
        $id: '123460',
        version: 1,
        web: 'flm2005',
        rates: 5.0,
        labels: [
          {
            group: 'top',
            code: 'flm1011',
            quantity: 19,
            id: 'label13',
            createdAt: '2023-09-29T12:00:00Z'
          },
          {
            group: 'bottom',
            code: 'flm1015',
            quantity: 5,
            id: 'label14',
            createdAt: '2023-09-29T13:00:00Z'
          },
          {
            group: 'sticker',
            code: 'flm1020',
            quantity: 21,
            id: 'label15',
            createdAt: '2023-09-29T14:00:00Z'
          }
        ]
      }
    ]);
  }, []);

  const onAddProduct = ({
    name,
    aCode,
    web,
    version,
    rates,
    labels
  }: Product) => {
    console.log('Add Product Clicked');

    const newProduct = {
      name,
      aCode,
      web,
      rates,
      version,
      labels
    };

    setProducts([...products, newProduct]);

    useProductsStore.setState((state) => ({
      products: [...state.products, newProduct]
    }));

    setIsAddModalOpen(false);
  };

  const handleClose = () => {
    console.log('Close Modal Clicked');

    setIsAddModalOpen(false);
  };

  const filteredProduct = products.filter(
    (products) =>
      (products.aCode && products.aCode.includes(searchQuery)) ||
      (products.name &&
        products.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Products</h1>
      <hr className='mb-4' />

      <div className='mb-4 flex justify-between'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Add Product +
        </button>
      </div>

      <ProductsList products={filteredProduct} />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleClose}
        onAdd={onAddProduct}
      />
    </div>
  );
}

export default ProductPage;
