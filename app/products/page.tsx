'use client';
import React, { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import { Product, useProduct, useProductsStore } from '@/store/ProductsStore';
import AddModal from './AddModal';
import { Labels, useLabelsStore } from '@/store/LabelsStore';

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [labels, setLabels] = useState<Labels[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dateProduct = await useProductsStore.getState().setProductsFromDB();
      const dateLabels = await useLabelsStore.getState().setLabelsFromDB();

      setProducts(dateProduct);
      setLabels(dateLabels);
    };

    fetchData();
  }, []);

  const onAddProduct = async ({
    name,
    aCode,
    web,
    version,
    rates,
    packetInBox,
    labels
  }: Product) => {
    const newProduct = {
      name,
      aCode,
      web,
      rates,
      version,
      packetInBox,
      labels
    };

    setProducts([...products, newProduct]);

    useProductsStore.setState((state) => ({
      products: [...state.products, newProduct]
    }));

    try {
      await useProduct.getState().createProduct(newProduct);
      console.log('Product Created');
    } catch (error) {
      console.log(error);
    }

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
        existingLabels={labels}
      />
    </div>
  );
}

export default ProductPage;
