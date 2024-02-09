import { ID, database } from '@/appwrite';
import { create } from 'zustand';

interface Production {
  week?: number;
  products: ProductionProduct[];
}
export interface ProductionProduct {
  aCode: string;
  code?: string;
  labelCode?: string;
  quantities: number | null;
  date: Date | string;
}

interface ProductionState extends Production {
  setWeek: (week: number) => void;
  setACode: (aCode: string) => void;
  setCode: (code: string) => void;
  setquantities: (quantities: number | null) => void;
  setDate: (date: Date | string) => void;
  setProducts: (products: ProductionProduct[]) => void;
  setProductsFromDB: () => Promise<ProductionProduct[]>;
}

interface ProductionProductState extends ProductionProduct {
  setACode: (aCode: string) => void;
  setquantities: (quantities: number | null) => void;
  setDate: (date: Date | string) => void;
  createProduct: (product: ProductionProduct) => void;
  deleteProduct: ($id: string) => void;
}

const useProductionStore = create<ProductionState>((set) => ({
  week: 0,
  products: [{ aCode: '', quantities: 0, date: new Date() }],
  setWeek: (week: number) => set((state) => ({ ...state, week })),
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setCode: (code: string) => set((state) => ({ ...state, code })),
  setquantities: (quantities: number | null) =>
    set((state) => ({ ...state, quantities })),
  setDate: (date: Date | string) => set((state) => ({ ...state, date })),
  setProducts: (products: ProductionProduct[]) =>
    set((state) => ({ ...state, products })),
  setProductsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '651c49ecb2b3850611bf'
    );
    return data.documents.map((doc) => {
      return {
        aCode: doc.aCode || '',
        quantities: doc.quantities || 0,
        date: doc.date || 0,
        $id: doc.$id || ''
      };
    });
  }
}));

const useProductionProductStore = create<ProductionProductState>((set) => ({
  aCode: '',
  quantities: 0,
  date: new Date(),
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setquantities: (quantities: number | null) =>
    set((state) => ({ ...state, quantities })),
  setDate: (date: Date | string) => set((state) => ({ ...state, date })),

  createProduct: (product: ProductionProduct) => {
    database.createDocument(
      '6510bb07873546043cae',
      '651c49ecb2b3850611bf',
      ID.unique(),
      {
        aCode: product.aCode || '',
        quantities: product.quantities || 0,
        date: product.date || 0
      }
    );
  },
  deleteProduct: ($id: string) => {
    database.deleteDocument(
      '6510bb07873546043cae',
      '651c49ecb2b3850611bf',
      $id
    );
  }
}));

export { useProductionStore, useProductionProductStore };
