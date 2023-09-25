'use client';
import { useProductsStore } from '@/store/ProductsStore';
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { database } from '@/appwrite';

function ProductsList() {
  const [products, setProducts] = useProductsStore((state) => [
    state.products,
    state.setProducts
  ]);
  useEffect(() => {
    console.log('useEffect');
    const data = async () => {
      const data: any = await database.listDocuments(
        '6510bb07873546043cae',
        '6510bb1f8f240bd7c3b2'
      );
      try {
        setProducts(data.documents);
      } catch (e) {
        console.log(e);
      }
    };
    data();
  }, [setProducts]);

  return (
    <div>
      {products.map((product) => {
        console.log(product);

        return (
          <ProductCard
            key={product.$id}
            id={product.$id}
            name={product.name}
            aCode={product.aCode}
            version={product.version}
            web={product.web}
            rates={product.rates}
          />
        );
      })}
    </div>
  );
}

export default ProductsList;
