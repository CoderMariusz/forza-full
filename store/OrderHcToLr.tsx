import { ID, client, database } from '@/appwrite';
import { Client } from 'appwrite';
import { create } from 'zustand';

export interface OrderObject {
  webNumber: string;
  quantities: number;
  $id: string;
  done?: boolean;
  orderId?: number;
  archive?: boolean;
  date?: string;
  priority: boolean;
  startDate: string;
}
export interface NewOrderObject {
  webNumber: string;
  quantities: number;
  done?: boolean;
  orderId: number;
  archive?: boolean;
  startDate?: string;
  priority: boolean;
}
interface OrderState extends OrderObject {
  loadOrders: () => void;
  addOrder: (order: NewOrderObject) => void;
  removeOrder: (id: string) => void;
  updateOrder: (id: string, order: OrderObject) => void;
  liveOrders: () => void;
}

const useOrderStore = create<OrderState>((set, get) => ({
  webNumber: '',
  quantities: 0,
  priority: false,
  $id: '',
  done: false,
  archive: false,
  oderId: 1,
  date: '',
  startDate: '',
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
        startDate: new Date().toISOString(),
        webNumber: order.webNumber,
        priority: order.priority,
        quantities: order.quantities,
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
        quantities: order.quantities,
        done: order.done,
        archive: order.archive,
        date: order.date
      }
    );
    set((state) => ({ ...state, data }));
  },
  liveOrders: async () => {
    const data = await client.subscribe('database.*', (event) => {
      console.log(event);
      return event;
    });
    set((state) => ({ ...state, data }));
  }
}));

export { useOrderStore };
