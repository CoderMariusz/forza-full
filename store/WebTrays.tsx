import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface NewWebTrays {
  code: string;
  name: string;
  supplier: string;
  supCode: string;
}
export interface WebTrays extends NewWebTrays {
  $id: string;
}

export interface WebTraysStore extends WebTrays {
  loadWebTraysFromDB: () => Promise<WebTrays[]>;
  AddNewWeb: (newItem: NewWebTrays) => Promise<any>;
  removeWeb: (code: string) => Promise<any>;
  updateWeb: (code: string, newItem: WebTrays) => Promise<any>;
}

export const useWebTraysStore = create<WebTraysStore>((set) => ({
  code: '',
  name: '',
  supplier: '',
  supCode: '',
  $id: '',
  loadWebTraysFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65ac3031639107ed2b18'
    );

    const webTrays = data.documents.map((webTrays) => {
      return {
        code: webTrays.code,
        name: webTrays.name,
        supplier: webTrays.supplier,
        supCode: webTrays.supCode,
        $id: webTrays.$id
      };
    });
    set((state) => ({ ...state, webTrays }));
    return webTrays;
  },
  AddNewWeb: async (newItem) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65ac3031639107ed2b18',
      ID.unique(),
      newItem
    );
    try {
      set((state) => ({ ...state, data }));
      console.log(data);
      console.log('Add new web functionality to be implemented');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  removeWeb: async (id) => {
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65ac3031639107ed2b18',
      id
    );
    try {
      set((state) => ({ ...state, data }));
      console.log(data);
      console.log('Remove web functionality to be implemented');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  updateWeb: async (id, newItem) => {
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65ac3031639107ed2b18',
      id,
      newItem
    );
    try {
      set((state) => ({ ...state, data }));
      console.log(data);
      console.log('Update web functionality to be implemented');
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}));
