'use client';
import { LabelItem, useLabelsStore } from '@/store/LabelsStore';
import { Product, useProductsStore } from '@/store/Products';
import { RmMaterial, useRmMaterialsStore } from '@/store/RmMaterials';
import { WebTrays, useWebTraysStore } from '@/store/WebTrays';
import React, { use, useEffect, useState } from 'react';
import EditAddProductModal from './EditAddModal';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [rmData, setRmData] = useState<RmMaterial[]>([]);
  const [labelData, setLabelData] = useState<LabelItem[]>([]);
  const [websData, setWebsData] = useState<WebTrays[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(
    undefined
  );

  const fetchData = async () => {
    const products = await useProductsStore.getState().loadProductsFromDB();
    setProducts(products);
    const rmData = await useRmMaterialsStore.getState().loadRmMaterialsFromDB();
    setRmData(rmData);
    const labelData = await useLabelsStore.getState().loadLabelsFromDB();
    setLabelData(labelData);
    const WebsData = await useWebTraysStore.getState().loadWebTraysFromDB();
    setWebsData(WebsData);
  };

  const editProduct = (product: Product) => {
    setProductToEdit(product);
    setIsOpen(true);
  };

  const handleProductSubmit = async (newOrEditedProduct: any) => {
    if (
      products.some(
        (p) =>
          p.aCode === newOrEditedProduct.aCode ||
          p.$id === newOrEditedProduct.$id
      )
    ) {
      // Handle the case where the product is being edited

      await useProductsStore
        .getState()
        .updateProduct(newOrEditedProduct.$id, newOrEditedProduct);
    } else {
      // Handle adding a new product

      await useProductsStore.getState().AddNewProduct(newOrEditedProduct);
    }
    setLoading(!loading);
    setIsOpen(false); // Close the modal after submission
  };
  useEffect(() => {
    fetchData();
    setLoading(true);
  }, [loading]);

  // Filter products based on searchTerm
  const filteredProducts = products.filter(
    (product) =>
      product.aCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.rmCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.webCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.labelCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-xl font-bold text-center my-4'>Products</h1>
      <div className='p-2 flex justify-between items-baseline'>
        <input
          type='text'
          placeholder='Search by aCode, rmCode, webCode, labelCode'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mb-4 p-2 border border-gray-300 rounded w-full max-w-md'
        />
        <button
          onClick={() => setIsOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add New Product
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='px-2 py-2'>aCode</th>
              <th className='px-2 py-2'>Name</th>
              <th className='px-2 py-2'>WebCode</th>
              <th className='px-2 py-2'>LabelCode</th>
              <th className='px-2 py-2'>RmCode</th>
              <th className='px-2 py-2'>Rates</th>
              <th className='px-2 py-2'>Version</th>
              <th className='px-2 py-2'>PacketsInBox</th>
              <th className='px-2 py-2'>AdditionalInfo</th>
              <th className='px-2 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className='border px-2 py-2'>{product.aCode}</td>
                <td className='border px-2 py-2'>{product.name}</td>
                <td className='border px-2 py-2'>{product.webCode}</td>
                <td className='border px-2 py-2'>{product.labelCode}</td>
                <td className='border px-2 py-2'>{product.rmCode}</td>
                <td className='border px-2 py-2'>{product.rates}</td>
                <td className='border px-2 py-2'>{product.version}</td>
                <td className='border px-2 py-2'>{product.packetsInBox}</td>
                <td className='border px-2 py-2'>
                  {product.additionalInfo || 'N/A'}
                </td>
                <td className='border px-4 py-2'>
                  <button
                    onClick={() => editProduct(product)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
                    Edit
                  </button>

                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditAddProductModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setProductToEdit(undefined);
          }}
          onSubmit={(e) => handleProductSubmit(e)}
          existingProducts={products}
          webCodes={websData.map((web) => web.code)}
          rmCodes={rmData.map((rm) => rm.rmCode)}
          labelCodes={labelData.map((label) => label.code)}
          productToEdit={productToEdit}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
