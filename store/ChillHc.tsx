import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface ChillHcObject {
  rmCode: string;
  name: string;
  date: string;
  weight: number;
  repack?: boolean;
  aCode?: string;
  id: string;
}

interface ChillHcState extends ChillHcObject {
  loadChillHcFromDB: () => Promise<ChillHcObject[]>;
  addChillHcToDB: (chillHc: ChillHcObject) => Promise<any>;
  updateChillHcToDB: (chillHc: ChillHcObject) => Promise<any>;
  removeChillHcFromDB: (id: string) => Promise<any>;
}

const useChillHcState = create<ChillHcState>((set) => ({
  rmCode: '',
  name: '',
  date: '',
  weight: 0,
  repack: false,
  aCode: '',
  id: '',
  loadChillHcFromDB: async () => {
    // Implementation for loading ChillHc from DB
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65ae87fe424f0798ea83'
    );

    const chillHc = data.documents.map((chill) => {
      return {
        rmCode: chill.rmCode,
        name: chill.name,
        date: chill.date,
        weight: chill.weight,
        repack: chill.repack,
        aCode: chill.aCode,
        id: chill.$id
      };
    });
    set((state) => ({ ...state, chillHc }));
    return chillHc;
  },

  addChillHcToDB: async (chillHc) => {
    // Implementation for adding ChillHc to DB
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65ae87fe424f0798ea83',
      ID.unique(),
      chillHc
    );
    return data;
  },
  updateChillHcToDB: async (chillHc) => {
    // Implementation for updating ChillHc in DB
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65ae87fe424f0798ea83',
      chillHc.id,
      {
        name: chillHc.name,
        date: chillHc.date,
        weight: chillHc.weight,
        repack: chillHc.repack
      }
    );
    return data;
  },
  removeChillHcFromDB: async (id) => {
    // Implementation for removing ChillHc from DB
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65ae87fe424f0798ea83',
      id
    );
    return data;
  }
}));

export { useChillHcState };
