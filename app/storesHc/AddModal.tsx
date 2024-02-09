'use client';
import { Product } from '@/store/Products';
import { WebTrays } from '@/store/WebTrays';
import React, { useState, useEffect } from 'react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void; // Consider using a more specific type here
  webTraysData: WebTrays[];
  products: Product[];
}

function AddItemModal({
  isOpen,
  onClose,
  onAdd,
  webTraysData,
  products
}: AddItemModalProps) {
  const [selectedWebCode, setSelectedWebCode] = useState('');
  const [associatedProducts, setAssociatedProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState(['']);

  // Update associated products based on selected web code
  useEffect(() => {
    const relatedProducts = products.filter(
      (product) => product.webCode === selectedWebCode
    );
    setAssociatedProducts(relatedProducts);
    console.log('relatedProducts', relatedProducts);
  }, [selectedWebCode, products]);

  const handleAddquantities = () => setQuantities([...quantities, '']);

  const handlequantitiesChange = (index: number, value: string) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleSubmit = () => {
    // Construct and submit new item details

    onAdd({
      code: selectedWebCode,
      name: associatedProducts.map((product) => product.name),
      aCode: associatedProducts.map((product) => product.aCode),
      quantities: quantities.map(Number).filter((qty) => !isNaN(qty) && qty > 0)
    });
    handleClose();
  };

  const handleClose = () => {
    setSelectedWebCode('');
    setQuantities(['']);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <h2 className='text-lg font-bold mb-4'>Add New Item</h2>

        {/* WebCode Selection */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Web Code
          </label>
          <select
            value={selectedWebCode}
            onChange={(e) => setSelectedWebCode(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            <option value=''>Select Web Code</option>
            {webTraysData.map((web, index) => (
              <option
                key={index}
                value={web.code}>
                {web.code}
              </option>
            ))}
          </select>
        </div>

        {/* Associated ACode(s) and Name(s) */}
        {associatedProducts.length > 0 && (
          <>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                A-Code(s)
              </label>
              {associatedProducts.map((product, index) => (
                <p
                  key={index}
                  className='text-gray-700'>
                  {product.aCode}
                </p>
              ))}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Name(s)
              </label>
              {associatedProducts.map((product, index) => (
                <p
                  key={index}
                  className='text-gray-700'>
                  {product.name}
                </p>
              ))}
            </div>
          </>
        )}

        <div className='flex items-center max-w-fit flex-wrap'>
          {quantities.map((quantities, index) => (
            <div
              key={index}
              className='mb-4 flex align-items-center'>
              <label className='block text-gray-700 text-sm font-bold mb-2 mr-2 max-w-fit'>
                quantities {index + 1}
              </label>
              <input
                type='number'
                placeholder='quantities'
                value={quantities}
                onChange={(e) => handlequantitiesChange(index, e.target.value)}
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow'
              />
              <div className='flex items-center'>
                {quantities.length > 1 && (
                  <button
                    onClick={() => {
                      // Function to remove the current quantities field
                      const newQuantities = quantities.filter(
                        (_, qtyIndex) => qtyIndex !== index
                      );
                      setQuantities(newQuantities);
                    }}
                    type='button'
                    className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                    -
                  </button>
                )}
                {index === quantities.length - 1 && (
                  <button
                    onClick={handleAddquantities}
                    type='button'
                    className='ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'>
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit and Cancel buttons */}
        <div className='flex justify-end mt-4'>
          <button
            onClick={handleSubmit}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'>
            Add
          </button>
          <button
            onClick={handleClose}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
