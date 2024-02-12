import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface NewPlanningItem {
  line: number;
  productionTime: number;
  startTime: number;
  finishTime: number;
  code: string;
  productName: string;
  quantity: number;
}
export interface PlanningItem extends NewPlanningItem {
  $id: ID;
}

export interface PlanningStore {
  items: NewPlanningItem[];
  add: (item: NewPlanningItem) => void;
}

const usePlanningStore = create<PlanningStore>((set) => ({
  items: [],
  add: (item) =>
    set((state) => ({
      items: [...state.items, { ...item }]
    }))
}));

export { usePlanningStore };
