import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface RmMaterial {
  rmCode: string;
  name: string;
  supplier: string;
  supCode: string;
  additionalInfo?: string; // Assuming this field is optional
}
interface RmMaterialsStore extends RmMaterial {
  loadRmMaterialsFromDB: () => Promise<RmMaterial[]>;
  AddNewRmMaterial: (newItem: RmMaterial) => Promise<any>;
  removeRmMaterial: (rmCode: string) => Promise<any>;
  updateRmMaterial: (rmCode: string, newItem: RmMaterial) => Promise<any>;
}

export const useRmMaterialsStore = create<RmMaterialsStore>((set) => ({
  rmCode: '',
  name: '',
  supplier: '',
  supCode: '',
  loadRmMaterialsFromDB: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1'
    );

    const rmMaterials = data.documents.map((rmMaterials) => {
      return {
        rmCode: rmMaterials.rmCode,
        name: rmMaterials.name,
        supplier: rmMaterials.supplier,
        supCode: rmMaterials.supCode,
        additionalInfo: rmMaterials.additionalInfo || ''
      };
    });
    set((state) => ({ ...state, rmMaterials }));
    return rmMaterials;
  },
  AddNewRmMaterial: async (newItem) => {
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
  removeRmMaterial: async (rmCode) => {
    const data = await database.deleteDocument(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1',
      rmCode
    );
    try {
      set((state) => ({ ...state, data }));
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  updateRmMaterial: async (rmCode, newItem) => {
    const data = await database.updateDocument(
      '6510bb07873546043cae',
      '65c628df9c060b2600f1',
      rmCode,
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
