'use client';
import { database } from '@/appwrite';
import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import { useStoreProduct, useStoreProducts } from '@/store/ProductsStore';

interface Store {
  $id: string;
  aCode: string;
  topLabel: [string, number];
  bottomLabel: [string, number];
  sticker: [string, number];
}

function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null); // default selected store

  useEffect(() => {
    async function fetchData() {
      const data: any = await useStoreProducts.getState().setProductsFromDB();

      setStores(data.documents);
    }
    fetchData();
  }, []);

  const handleAddProduct = () => {
    console.log('Add: ');
  };

  const handleEdit = (store: (typeof stores)[0]) => {
    console.log('Edit: ', store);
  };

  const handleRemove = async (store: (typeof stores)[0]) => {
    const product = useStoreProduct.getState().getProduct(store.$id);
    useStoreProduct.getState().deleteProduct(store.$id);
    console.log('Remove: ', product);
    const newStores = stores.filter((s) => s.$id !== store.$id);
    setStores(newStores);
  };

  const handleCloseModal = async () => {
    const data: any = useStoreProducts.getState().setProductsFromDB();
    setStores(data.documents);
    setModalOpen(false);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Stores</h1>
      <div className='mb-4 flex justify-end'>
        <button
          onClick={handleAddProduct}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Add Store Product
        </button>
      </div>
      <hr className='mb-4' />
      <table className='min-w-full bg-white'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='w-1/4 py-2'>A-Code</th>
            <th className='w-1/4 py-2'>Top Label</th>
            <th className='w-1/4 py-2'>Bottom Label</th>
            <th className='w-1/4 py-2'>Sticker</th>

            <th className='w-1/4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {stores?.map((store: Store, index) => (
            <tr key={index}>
              <td className='text-center py-2'>{store.aCode}</td>
              <td className='text-center py-2'>
                <div>
                  <span className='font-bold'>Code:</span> {store.topLabel[0]}
                </div>
                <div>
                  <span className='font-bold'>Quantity:</span>{' '}
                  {store.topLabel[1]}
                </div>
              </td>
              <td className='text-center py-2'>
                <div>
                  <span className='font-bold'>Code:</span>{' '}
                  {store.bottomLabel[0]}
                </div>
                <div>
                  <span className='font-bold'>Quantity:</span>{' '}
                  {store.bottomLabel[1]}
                </div>
              </td>
              <td className='text-center py-2'>
                <div>
                  <span className='font-bold'>Code:</span> {store.sticker[0]}
                </div>
                <div>
                  <span className='font-bold'>Quantity:</span>{' '}
                  {store.sticker[1]}
                </div>
              </td>
              <td className='text-center p-2 flex space-x-2'>
                <button
                  onClick={() => {
                    handleEdit(store);
                    setSelectedStore(store);
                    setModalOpen(true);
                  }}
                  className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(store)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        store={selectedStore!}
      />
    </div>
  );
}

export default StoresPage;
