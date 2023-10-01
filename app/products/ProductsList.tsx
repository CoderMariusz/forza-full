'use client';
import React, { useState } from 'react';
import { Product } from '@/store/ProductsStore';

function ProductsList({ products }: { products: Product[] }) {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );

  return (
    <div className='flex flex-col my-4 w-full mx-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-200'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='py-2'>A-Code</th>
            <th className='py-2'>Name</th>
            <th className='hidden md:table-cell py-2'>Version</th>
            <th className='hidden md:table-cell py-2'>Web</th>
            <th className='hidden md:table-cell py-2'>Rates</th>
            <th className='hidden md:table-cell py-2'>Labels</th>
            <th className='py-2'>Actions</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {products.map((product) => (
            <React.Fragment key={product.$id}>
              <tr>
                <td className='border p-2'>{product.aCode}</td>
                <td className='border p-2'>{product.name}</td>
                <td className='hidden md:table-cell border p-2'>
                  {product.version}
                </td>
                <td className='hidden md:table-cell border p-2'>
                  {product.web}
                </td>
                <td className='hidden md:table-cell border p-2'>
                  {product.rates}
                </td>
                <td className='hidden md:table-cell border p-2 w-64 min-w-[200px]'>
                  {product.labels &&
                    product.labels.map((label) => (
                      <div key={label.id}>
                        <strong>Group:</strong> {label.group} -{' '}
                        <strong>Code:</strong> {label.code}
                      </div>
                    ))}
                </td>
                <td className='border p-2'>
                  <button
                    onClick={() =>
                      setExpandedProductId(
                        expandedProductId === product.$id
                          ? null
                          : product.$id || null
                      )
                    }
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                    {expandedProductId === product.$id
                      ? 'Hide Details'
                      : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedProductId === product.$id && (
                <tr className='md:hidden'>
                  <td
                    colSpan={6}
                    className='border p-2'>
                    <div className='flex flex-col'>
                      <div>Version: {product.version}</div>
                      <div>Web: {product.web}</div>
                      <div>Rates: {product.rates}</div>
                      <div className='pt-2'>Labels:</div>
                      <div className='flex justify-between mx-3'>
                        {product.labels &&
                          product.labels.map((label) => (
                            <div
                              key={label.id}
                              className='pl-4'>
                              <div>Group: {label.group}</div>
                              <div>Code: {label.code}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
