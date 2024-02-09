'use client';
import React, { useState, useEffect, HtmlHTMLAttributes } from 'react';
import { NewProduct, Product } from '@/store/Products'; // Adjust import paths as needed

interface EditAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: NewProduct) => void;
  existingProducts: Product[];
  productToEdit?: Product;
  webCodes: string[];
  rmCodes: string[];
  labelCodes: string[];
}

const EditAddProductModal: React.FC<EditAddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  existingProducts,
  productToEdit,
  webCodes,
  rmCodes,
  labelCodes
}) => {
  const [product, setProduct] = useState<NewProduct>({
    aCode: '',
    name: '',
    webCode: '',
    labelCode: '',
    rmCode: '',
    rates: 0,
    version: 0,
    packetsInBox: 0,
    additionalInfo: ''
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize form with productToEdit or empty values
    setError('');
    if (productToEdit !== undefined) {
      setProduct(productToEdit);
    }
    setProduct(
      productToEdit || {
        aCode: '',
        name: '',
        webCode: '',
        labelCode: '',
        rmCode: '',
        rates: 0,
        version: 0,
        packetsInBox: 0,
        additionalInfo: ''
      }
    );
  }, [productToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setError('');
    if (name === 'aCode' && existingProducts.some((p) => p.aCode === value)) {
      setError('aCode already exists');
    }
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!product.aCode || !product.name) {
      setError('Please enter aCode and Name');
      return;
    }

    if (existingProducts.some((p) => p.aCode === product.aCode)) {
      onSubmit(product);
      setError('aCode already exists');
      return;
    }
    onSubmit(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-lg w-full'>
        <h2 className='text-2xl mb-4'>
          {productToEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className='mb-4'>
          <label
            htmlFor='aCode'
            className='block text-sm font-medium text-gray-700'>
            aCode
          </label>
          <input
            id='aCode'
            type='text'
            name='aCode'
            value={product.aCode}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter aCode'
          />
          {error === 'aCode already exists' && (
            <p className='text-red-500 text-xs mt-2'>{error}</p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            id='name'
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter Name'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='rates'
            className='block text-sm font-medium text-gray-700'>
            Rates
          </label>
          <input
            id='rates'
            type='number'
            name='rates'
            value={product.rates}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter Rates'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='version'
            className='block text-sm font-medium text-gray-700'>
            Version
          </label>
          <input
            id='version'
            type='number'
            name='version'
            value={product.version}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter Version'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='packetsInBox'
            className='block text-sm font-medium text-gray-700'>
            Packets In Box
          </label>
          <input
            id='packetsInBox'
            type='number'
            name='packetsInBox'
            value={product.packetsInBox}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter Packets In Box'
          />
        </div>

        {/* Repeat the pattern for selects */}
        <div className='mb-4'>
          <label
            htmlFor='rmCode'
            className='block text-sm font-medium text-gray-700'>
            RM Code
          </label>
          <select
            id='rmCode'
            name='rmCode'
            value={product.rmCode}
            onChange={handleChange}
            className='mt-1 p-2 border border-gray-300 rounded w-full'>
            <option value=''>Select RM Code</option>
            {rmCodes.map((code) => (
              <option
                key={code}
                value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        {/* Repeat for webCode and labelCode selects */}

        <div className='mb-4'>
          <label
            htmlFor='additionalInfo'
            className='block text-sm font-medium text-gray-700'>
            Additional Information
          </label>
          <textarea
            id='additionalInfo'
            name='additionalInfo'
            value={product.additionalInfo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e)
            }
            className='mt-1 p-2 border border-gray-300 rounded w-full'
            placeholder='Enter Additional Information'
          />
        </div>

        <div className='flex justify-end gap-2'>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
            Save
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-700/80'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddProductModal;
