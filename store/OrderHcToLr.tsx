import { ID, database } from '@/appwrite';
import { create } from 'zustand';

export interface OrderObject {
  webNumber: string;
  quantity: number;
  $id: string;
  done?: boolean;
  orderId?: number;
  archive?: boolean;
  date?: string;
}
export interface NewOrderObject {
  webNumber: string;
  quantity: number;
  done?: boolean;
  orderId: number;
  archive?: boolean;
}
interface OrderState extends OrderObject {
  loadOrders: () => void;
  addOrder: (order: NewOrderObject) => void;
  removeOrder: (id: string) => void;
  updateOrder: (id: string, order: OrderObject) => void;
}

const useOrderStore = create<OrderState>((set, get) => ({
  webNumber: '',
  quantity: 0,
  $id: '',
  done: false,
  archive: false,
  oderId: 0,
  date: '',
  loadOrders: async () => {
    const data = await database.listDocuments(
      '6510bb07873546043cae',
      '65b7c2b4eb99ce07b2fe'
    );
    const orders = data.documents;
    set((state) => ({ ...state, orders }));
    return orders;
  },
  addOrder: (order: NewOrderObject) => {
    const data = database.createDocument(
      '6510bb07873546043cae',
      '65b7c2b4eb99ce07b2fe',
      ID.unique(),
      {
        webNumber: order.webNumber,
        quantity: order.quantity,
        done: false,
        orderId: order.orderId
      }
    );
    set((state) => ({ ...state, data }));
  },
  removeOrder: (id: string) => {
    const data = database.deleteDocument(
      '6510bb07873546043cae',
      '65b7c2b4eb99ce07b2fe',
      id
    );
    set((state) => ({ ...state, data }));
  },
  updateOrder: (id: string, order: OrderObject) => {
    const data = database.updateDocument(
      '6510bb07873546043cae',
      '65b7c2b4eb99ce07b2fe',
      id,
      {
        webNumber: order.webNumber,
        quantity: order.quantity,
        done: order.done,
        archive: order.archive,
        date: order.date
      }
    );
    set((state) => ({ ...state, data }));
  }
}));

export { useOrderStore };
