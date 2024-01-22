import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface StoresHcObject {
  aCode: string;
  code: string;
  name: string;
  quantity: number[];
  id: string;
}

interface StoresHcState extends StoresHcObject {
  setQuantity: (quantity: number[]) => void;
  loadStoresHcFromDB: () => Promise<StoresHcObject[]>;
  addStoresHcToDB: (storesHc: StoresHcObject) => Promise<any>;
  updateStoresHcToDB: (storesHc: StoresHcObject) => Promise<any>;
}

const useStoresHcStore = create<StoresHcState>((set: any) => ({
  aCode: '',
  code: '',
  name: '',
  quantity: [],
  id: '',

  setQuantity: (quantity: number[]) =>
    set((state: any) => ({ ...state, quantity })),
  loadStoresHcFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65a989c11654114ef8aa'
    );
    const storesHc = data.documents.map((store) => {
      return {
        aCode: store.aCode,
        code: store.code,
        name: store.name,
        quantity: store.quantity,
        id: store.$id
      };
    });
    set((state: any) => ({ ...state, storesHc }));
    return storesHc;
  },
  addStoresHcToDB: async (storesHc: StoresHcObject) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65a989c11654114ef8aa',
      ID.unique(),
      storesHc
    );
    return data;
  },
  updateStoresHcToDB: async (storesHc: StoresHcObject) => {
    try {
      const data = await database.updateDocument(
        '6510bb07873546043cae',
        '65a989c11654114ef8aa',
        storesHc.id,
        {
          quantity: storesHc.quantity
        }
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}));

export { useStoresHcStore };
