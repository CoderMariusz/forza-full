import { ID, database } from '@/appwrite';
import create from 'zustand';

interface Production {
  week?: number;
  products: ProductionProduct[];
}
export interface ProductionProduct {
  aCode: string;
  code?: string;
  labelCode?: string;
  quantity: number | null;
  date: number;
}

interface ProductionState extends Production {
  setWeek: (week: number) => void;
  setACode: (aCode: string) => void;
  setCode: (code: string) => void;
  setQuantity: (quantity: number | null) => void;
  setDate: (date: number) => void;
  setProducts: (products: ProductionProduct[]) => void;
  setProductsFromDB: () => Promise<ProductionProduct[]>;
}

interface ProductionProductState extends ProductionProduct {
  setACode: (aCode: string) => void;
  setQuantity: (quantity: number | null) => void;
  setDate: (date: number) => void;
}

const useProductionStore = create<ProductionState>((set) => ({
  week: 0,
  products: [{ aCode: '', quantity: 0, date: 0 }],
  setWeek: (week: number) => set((state) => ({ ...state, week })),
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setCode: (code: string) => set((state) => ({ ...state, code })),
  setQuantity: (quantity: number | null) =>
    set((state) => ({ ...state, quantity })),
  setDate: (date: number) => set((state) => ({ ...state, date })),
  setProducts: (products: ProductionProduct[]) =>
    set((state) => ({ ...state, products })),
  setProductsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '651c49ecb2b3850611bf'
    );
    return data.documents.map((doc) => ({
      aCode: doc.data.aCode || '',
      quantity: doc.data.quantity || 0,
      date: doc.data.date || 0
    })) as ProductionProduct[];
  }
}));

const useProductionProductStore = create<ProductionProductState>((set) => ({
  aCode: '',
  quantity: 0,
  date: 0,
  setACode: (aCode: string) => set((state) => ({ ...state, aCode })),
  setQuantity: (quantity: number | null) =>
    set((state) => ({ ...state, quantity })),
  setDate: (date: number) => set((state) => ({ ...state, date })),
  createProduct: (product: ProductionProduct) => {
    database.createDocument(
      '6510bb07873546043cae',
      '651c49ecb2b3850611bf',
      ID.unique(),
      {
        aCode: product.aCode || '',
        quantity: product.quantity || 0,
        date: product.date || 0
      }
    );
  }
}));

export { useProductionStore, useProductionProductStore };
