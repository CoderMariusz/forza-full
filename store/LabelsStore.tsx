import { create } from 'zustand';
import { database, ID } from '@/appwrite';

export interface NewLabelItem {
  code: string;
  name: string;
  group: string;
}
export interface LabelItem extends NewLabelItem {
  $id: string;
}

interface LabelsStore extends LabelItem {
  loadLabelsFromDB: () => Promise<LabelItem[]>;
  addNewLabel: (newItem: NewLabelItem) => Promise<any>;
  removeLabel: (code: string) => Promise<any>;
  updateLabel: (code: string, newItem: LabelItem) => Promise<any>;
}

export const useLabelsStore = create<LabelsStore>((set) => ({
  code: '',
  name: '',
  group: '',
  $id: '',
  loadLabelsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde'
    );

    const labels = data.documents.map((label) => {
      return {
        code: label.code,
        name: label.name,
        group: label.group,
        $id: label.$id
      };
    });
    set((state) => ({ ...state, labels }));
    return labels;
  },
  addNewLabel: async (newItem) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde',
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
  removeLabel: async (id) => {
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde',
      id
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  updateLabel: async (code, newItem) => {
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde',
      code,
      newItem
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}));
