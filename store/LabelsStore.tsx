import { create } from 'zustand';
import { database, ID } from '@/appwrite';

export interface LabelItem {
  code: string;
  name: string;
  group: string;
}

interface LabelsStore extends LabelItem {
  loadLabelsFromDB: () => Promise<LabelItem[]>;
  addNewLabel: (newItem: LabelItem) => Promise<any>;
  removeLabel: (code: string) => Promise<any>;
  updateLabel: (code: string, newItem: LabelItem) => Promise<any>;
}

export const useLabelsStore = create<LabelsStore>((set) => ({
  code: '',
  name: '',
  group: '',
  loadLabelsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1'
    );

    const labels = data.documents.map((label) => {
      return {
        code: label.code,
        name: label.name,
        group: label.group
      };
    });
    set((state) => ({ ...state, labels }));
    return labels;
  },
  addNewLabel: async (newItem) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1',
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
  removeLabel: async (code) => {
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1',
      code
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
      '65c628df9c060b2600f1',
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
