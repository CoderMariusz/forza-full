import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface TrimObject {
  name: string;
  date: string;
  kg: number;
  id: string;
}

interface NewTrimObject {
  name: string;
  date: string;
  kg: number;
}

interface TrimState extends TrimObject {
  loadTrimFromDB: () => Promise<TrimObject[]>;
  addTrimToDB: (trim: NewTrimObject) => Promise<any>;
  updateTrimToDB: (trim: TrimObject) => Promise<any>;
  removeTrimFromDB: (id: string) => Promise<any>;
}

const useTrimState = create<TrimState>((set) => ({
  name: '',
  date: '',
  kg: 0,
  id: '',
  loadTrimFromDB: async () => {
    // Implementation for loading Trim from DB
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65b1a6ab6056425f5547'
    );

    const trim = data.documents.map((trim) => {
      return {
        name: trim.name,
        date: trim.date,
        kg: trim.kg,
        id: trim.$id
      };
    });
    set((state) => ({ ...state, trim }));
    return trim;
  },

  addTrimToDB: async (trim) => {
    // Implementation for adding Trim to DB
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65b1a6ab6056425f5547',
      ID.unique(),
      trim
    );
    return data;
  },

  updateTrimToDB: async (trim) => {
    // Implementation for updating Trim to DB
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65b1a6ab6056425f5547',
      trim.id,
      trim
    );
    return data;
  },

  removeTrimFromDB: async (id) => {
    // Implementation for removing Trim from DB
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65b1a6ab6056425f5547',
      id
    );
    console.log('item deleted' + data);

    return data;
  }
}));

export default useTrimState;
