import { database } from '@/appwrite';
import { create } from 'zustand';

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}
interface Product {
  name: string;
  aCode: string;
  $id: string;
  version: number;
  web: string;
  rates: number;
  setName: (name: string) => void;
  setACode: (email: string) => void;
  setId: (id: string) => void;
  setVersion: (version: number) => void;
  setWeb: (web: string) => void;
  setRates: (rates: number) => void;
  editProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
}

interface StoreProducts {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setProductsFromDB: () => void;
}

interface ProductStore {
  aCode: string;
  topLabel: [string, number];
  bottomLabel: [string, number];
  sticker: [string, number];
  setACode: (aCode: string) => void;
  setTopLabel: (topLabel: [string, number]) => void;
  setBottomLabel: (bottomLabel: [string, number]) => void;
  setSticker: (sticker: [string, number]) => void;
  addProduct: (product: ProductStore) => void;
  getProduct: (id: string) => void;
  editProduct: (id: string, product: ProductStore) => void;
  deleteProduct: (id: string) => void;
}

const useProductsStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set((state) => ({ ...state, products }))
}));

const useProduct = create<Product>((set) => ({
  name: '',
  aCode: '',
  $id: '',
  version: 0,
  web: '',
  rates: 0,
  setName: (name: string) => set((state) => ({ ...state, name })),
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setId: (id: string) => set((state) => ({ ...state, id })),
  setVersion: (version: number) => set((state) => ({ ...state, version })),
  setWeb: (web: string) => set((state) => ({ ...state, web })),
  setRates: (rates: number) => set((state) => ({ ...state, rates })),

  editProduct: async (id: string, product: Product) => {
    await database.updateDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      id,
      {
        name: product?.name || '',
        aCode: product?.aCode || '',
        version: product?.version || 0,
        web: product?.web || '',
        rates: product?.rates || 0
      }
    );
  },

  deleteProduct: async (id: string) => {
    await database.deleteDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      id
    );
  }
}));

const useStoreProducts = create<StoreProducts>((set) => ({
  products: [],
  setProducts: (products: Product[]) =>
    set((state) => ({ ...state, products })),
  setProductsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '6511ee740583b96d787b'
    );
    return data;
  }
}));

const useStoreProduct = create<ProductStore>((set) => ({
  aCode: '',
  topLabel: ['', 0],
  bottomLabel: ['', 0],
  sticker: ['', 0],
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setTopLabel: (topLabel: [string, number]) =>
    set((state) => ({ ...state, topLabel })),
  setBottomLabel: (bottomLabel: [string, number]) =>
    set((state) => ({ ...state, bottomLabel })),
  setSticker: (sticker: [string, number]) =>
    set((state) => ({ ...state, sticker })),
  addProduct: async (product: ProductStore) => {
    await database.createDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      '',
      {
        aCode: product.aCode,
        topLabel: product.topLabel,
        bottomLabel: product.bottomLabel,
        sticker: product.sticker
      },
      [] // add an empty array as the fifth argument
    );
  },
  getProduct: async (id: string) => {
    const data = await database.getDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      id
    );
    console.log(data);
    return data;
  },
  editProduct: async (id: string, product: ProductStore) => {
    await database.updateDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      id,
      {
        aCode: product.aCode,
        topLabel: product.topLabel,
        bottomLabel: product.bottomLabel,
        sticker: product.sticker
      }
    );
  },
  deleteProduct: async (id: string) => {
    await database.deleteDocument(
      '6510bb07873546043cae',
      '6511ee740583b96d787b',
      id
    );
  }
}));

export { useProductsStore, useProduct, useStoreProduct, useStoreProducts };
