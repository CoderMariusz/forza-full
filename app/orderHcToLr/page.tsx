'use client';
import React, { useEffect, useState } from 'react';
import OrderModal from './OrderModal';
import OrderCard from './OrderCard';
import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';

export interface Orders {
  webOrder: OrderObject[];
  id: string;
}

const OrderHcToLrPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [webOrder, setWebOrders] = useState<OrderObject[]>([]); // Order type is defined in OrderModal.tsx

  const loadOrders = async () => {
    const data = await useOrderStore.getState().loadOrders();
    console.log(data);

    if (data !== undefined && data) {
      // Group orders by orderId
      const groupedOrders = (data as any[]).reduce((acc: any, order: any) => {
        if (!acc[order.orderId]) {
          acc[order.orderId] = [];
        }
        acc[order.orderId].push(order);
        return acc;
      }, {});

      // Convert the grouped orders into an array of arrays
      const groupedOrdersArray = Object.values(groupedOrders);

      // Set the new webOrders
      setWebOrders(groupedOrdersArray as OrderObject[]);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const fetchData = async () => {
    const data = await fetch(
      'https://https://forza-function-kubd.vercel.app/'
    ).then((res) => res.json());
    console.log(data);
  };

  console.log(webOrder);

  useEffect(() => {
    loadOrders();
    setLoading(true);
    fetchData();
  }, [loading]);

  return (
    <div className='w-full'>
      <h1 className='text-3xl p-3 font-bold'>Order HC to Lr</h1>
      <hr />
      <div className='flex justify-start gap-3'>
        {/* Order table content */}
        {webOrder &&
          webOrder.map((order, index) => (
            <OrderCard
              key={index}
              id={parseInt(order?.id) ?? 0}
              data={[webOrder[index]]}
            />
          ))}
      </div>
      <button
        onClick={handleOpenModal}
        className='bg-blue-400 hover:bg-blue-600 p-2 m-3 text-white font-semibold '>
        Add Order
      </button>

      {/* Modal component */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-4'>
            <OrderModal
              setIsOpen={(e) => setIsOpen(e)}
              webOrdersLength={webOrder.length}
              setLoading={(e) => setLoading(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHcToLrPage;
