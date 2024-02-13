import { create } from 'zustand';
import { database, ID } from '@/appwrite';

export interface NewProduct {
  aCode: string;
  name: string;
  webCode: string;
  labelCode: string;
  bottomLabelCode: string;
  rmCode: string;
  rates: number;
  version: number;
  packetsInBox: number;
  additionalInfo?: string; // Assuming this field is optional
}
export interface Product extends NewProduct {
  $id: string;
  // Assuming this field is optional
}
interface ProductsStore extends Product {
  loadProductsFromDB: () => Promise<Product[]>;
  AddNewProduct: (newItem: NewProduct) => Promise<any>;
  removeProduct: (code: string) => Promise<any>;
  updateProduct: (code: string, newItem: Product) => Promise<any>;
}
export const useProductsStore = create<ProductsStore>((set) => ({
  $id: '',
  aCode: '',
  name: '',
  webCode: '',
  labelCode: '',
  bottomLabelCode: '',
  rmCode: '',
  rates: 0,
  version: 0,
  packetsInBox: 0,
  additionalInfo: '',
  loadProductsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2'
    );

    const products = data.documents.map((product) => {
      return {
        $id: product.$id,
        aCode: product.aCode,
        name: product.name,
        webCode: product.webCode,
        labelCode: product.labelCode,
        bottomLabelCode: product.bottomLabelCode,
        rmCode: product.rmCode,
        rates: product.rates,
        version: product.version,
        packetsInBox: product.packetsInBox,
        additionalInfo: product.additionalInfo || ''
      };
    });
    set((state) => ({ ...state, products }));
    return products;
  },
  AddNewProduct: async (newItem) => {
    console.log('Adding new product', newItem);

    const data = await database.createDocument(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2',
      ID.unique(),
      newItem
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  removeProduct: async (id) => {
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2',
      id
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  updateProduct: async (id, newItem) => {
    console.log('Updating product', newItem);

    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2',
      id,
      {
        aCode: newItem.aCode,
        name: newItem.name,
        webCode: newItem.webCode,
        labelCode: newItem.labelCode,
        bottomLabelCode: newItem.bottomLabelCode,
        rmCode: newItem.rmCode,
        rates: newItem.rates,
        version: newItem.version,
        packetsInBox: newItem.packetsInBox,
        additionalInfo: newItem.additionalInfo
      }
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}));
