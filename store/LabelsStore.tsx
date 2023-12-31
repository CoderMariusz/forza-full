import { create } from 'zustand';
import { database, ID } from '@/appwrite';

export interface LabelsState {
  labels?: Labels[];
  setLabels: (labels: Labels[]) => void;
  setLabelsFromDB: () => Promise<Labels[]>;
}

export interface Labels {
  group?: string;
  code?: string;
  quantity?: number | null;
  $id?: string;
  $createdAt?: string;
}

export interface LabelState {
  group?: string;
  code?: string;
  quantity?: number | null;
  $id?: string;
  $createdAt?: string;
  setGroup: (group: string) => void;
  setCode: (code: string) => void;
  setQuantity: (quantity: number | null) => void;
  setId: (id: string) => void;
  setCreatedAt: (createdAt: string) => void;
  createLabel: (label: Labels) => Promise<void>;
  updateLabel: (id: string, change: number) => Promise<void>;
}

const useLabels = create<LabelState>((set) => ({
  group: '',
  code: '',
  quantity: 0,
  $createdAt: '',
  setGroup: (group: string) => set((state) => ({ ...state, group })),
  setCode: (code: string) => set((state) => ({ ...state, code })),
  setQuantity: (quantity: number | null) =>
    set((state) => ({ ...state, quantity })),
  setId: (id: string) => set((state) => ({ ...state, id })),
  setCreatedAt: (createdAt: string) =>
    set((state) => ({ ...state, createdAt })),
  createLabel: async (label: Labels) => {
    const data = await database.createDocument(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde',
      ID.unique(),
      {
        group: label.group || '',
        code: label.code || '',
        quantity: label.quantity || 0
      }
    );
  },
  updateLabel: async ($id: string, change: number | null): Promise<void> => {
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde',
      $id,
      {
        quantity: change || 0
      }
    );
  }
}));

const useLabelsStore = create<LabelsState>((set) => ({
  labels: [],
  setLabels: (labels: Labels[]) => set((state) => ({ ...state, labels })),
  setLabelsFromDB: async (): Promise<Labels[]> => {
    const labels = await database.listDocuments(
      '6510bb07873546043cae',
      '65141203c8f6aaa2dcde'
    );
    try {
      const data = labels.documents.map(
        (doc): Labels => ({
          group: doc.group,
          code: doc.code,
          quantity: doc.quantity || 0,
          $id: doc.$id,
          $createdAt: doc.$createdAt
        })
      );

      return data;
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}));

export { useLabels, useLabelsStore };
