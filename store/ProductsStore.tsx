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
  setRates: (rates: number) => set((state) => ({ ...state, rates }))
}));

export { useProductsStore, useProduct };
