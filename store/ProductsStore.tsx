import { ID, database } from '@/appwrite';
import { create } from 'zustand';
import { Labels } from './LabelsStore';

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setProductsFromDB: () => Promise<Product[]>;
}

export interface Product {
  name: string;
  aCode: string;
  $id?: string;
  version: number;
  web: string;
  rates: number;
  labels: Labels[];
  packetInBox: number;
}

interface ProductState extends Product {
  setName: (name: string) => void;
  setACode: (aCode: string) => void;
  setId: (id: string) => void;
  setVersion: (version: number) => void;
  setWeb: (web: string) => void;
  setRates: (rates: number) => void;
  setLabels: (labels: Labels[]) => void;
  loadProductFromDB: () => Promise<Product[]>;
  createProduct: (product: Product) => void;
  editProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
}

const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products: Product[]) =>
    set((state) => ({ ...state, products })),
  setProductsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2'
    );
    const products = data.documents.map((product) => {
      return {
        name: product.name,
        aCode: product.aCode,
        $id: product.$id,
        version: product.version,
        web: product.web,
        rates: product.rates,
        labels: product.labels,
        packetInBox: product.packetInBox
      };
    });
    set((state) => ({ ...state, products }));
    return products;
  }
}));

const useProduct = create<ProductState>((set) => ({
  name: '',
  aCode: '',
  version: 0,
  web: '',
  rates: 0,
  labels: [],
  packetInBox: 0,

  setName: (name: string) => set((state) => ({ ...state, name })),
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setId: (id: string) => set((state) => ({ ...state, id })),
  setVersion: (version: number) => set((state) => ({ ...state, version })),
  setWeb: (web: string) => set((state) => ({ ...state, web })),
  setRates: (rates: number) => set((state) => ({ ...state, rates })),
  setLabels: (labels: Labels[]) => set((state) => ({ ...state, labels })),
  setPacketInBox: (packetInBox: number) =>
    set((state) => ({ ...state, packetInBox })),

  loadProductFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2'
    );
    const products = data.documents.map((product) => {
      return {
        name: product.name,
        aCode: product.aCode,
        $id: product.$id,
        version: product.version,
        web: product.web,
        rates: product.rates,
        labels: product.labels,
        packetInBox: product.packetInBox
      };
    });
    set((state) => ({ ...state, products }));
    return products;
  },

  createProduct: async (product: Product) => {
    console.log('product send', product);
    const relation = product.labels?.map((label) => {
      return label.$id;
    });
    console.log('relation', relation);

    const data = await database.createDocument(
      '6510bb07873546043cae',
      '6510bb1f8f240bd7c3b2',
      ID.unique(),
      {
        name: product?.name || '',
        aCode: product?.aCode || '',
        version: product?.version || 0,
        web: product?.web || '',
        rates: product?.rates || 0,
        packetInBox: product?.packetInBox || 0,
        labels: relation || []
      }
    );
    console.log(data);
  },

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
        rates: product?.rates || 0,
        labels: product?.labels || []
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

export { useProductsStore, useProduct };
