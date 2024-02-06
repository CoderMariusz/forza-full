import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';
import React, { use, useState } from 'react';

interface OrderCardProps {
  id: number;
  data: OrderObject[];
}

const OrderCard: React.FC<OrderCardProps> = ({ id, data }) => {
  const [order, setOrder] = useState<OrderObject[]>(data);

  console.log(order);

  const markOrderAsDone = async (orderId: number | undefined) => {
    if (order.length === undefined || order.length === 0) {
      return;
    }
    const updatedOrder = await Promise.all(
      order.map(async (order) => {
        if (order.orderId === orderId) {
          const date = new Date()
            .toISOString()
            .trim()
            .split('.')[0]
            .replace('T', ' ');

          await useOrderStore
            .getState()
            .updateOrder(order.$id, { ...order, done: true, date: date });
          return { ...order, done: true };
        }
        return order;
      })
    );
    setOrder(updatedOrder);
  };

  return (
    <div className='bg-[#97caef] rounded-lg shadow-lg m-3 pb-1 max-w-sm'>
      <div
        className={`text-2xl font-bold mb-4 rounded-t-lg p-2 flex justify-between ${
          order[0].done ? 'bg-yellow-500' : ''
        }`}>
        <h2>Order Card #{id}</h2>
        <div>
          <p className='text-lg'>{order[0].done ? 'Order is done' : null}</p>
          <p className='text-xs'>{order[0].date ? order[0].date : null}</p>
        </div>
      </div>
      <div
        key={order[0].orderId}
        className='mb-4 mx-2'>
        {order.map((item: OrderObject) => (
          <div
            key={Math.random() * 1000}
            className='flex justify-between '>
            <p className='text-lg text-gray-800'>{item.webNumber}</p>
            <p className='text-lg text-gray-800 '>{item.quantity}</p>
          </div>
        ))}
        {!order[0].done && (
          <div className='flex justify-end'>
            <button
              className='bg-[#fc4445] text-white text-sm font-semibold px-3 py-2 rounded-lg mt-3'
              onClick={() => markOrderAsDone(order[0].orderId)}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
