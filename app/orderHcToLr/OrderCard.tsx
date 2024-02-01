import { OrderObject } from '@/store/OrderHcToLr';
import React, { useState } from 'react';

interface OrderCardProps {
  id: number;
  data: OrderObject[];
}

const OrderCard: React.FC<OrderCardProps> = ({ id, data }) => {
  const [orders, setOrders] = useState<OrderObject[]>(data);

  const markOrderAsDone = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === String(orderId) ? { ...order, done: true } : order
      )
    );
  };

  return (
    <div className='bg-[#97caef] rounded-lg shadow-lg m-3 pb-1'>
      <h2
        className={`text-2xl font-bold mb-4 rounded-t-lg p-2 ${
          orders.every((order) => order.done) ? 'bg-yellow-500' : ''
        }`}>
        Order Card #{id}
      </h2>
      {orders.map((order: any) => {
        return (
          <div
            key={order}
            className='mb-4 mx-2'>
            {order.map((item: OrderObject) => (
              <div
                key={item.id}
                className='flex justify-between '>
                <p className='text-lg text-gray-800'>{item.webNumber}</p>
                <p className='text-lg text-gray-800 '>{item.quantity}</p>
              </div>
            ))}
            {!order.done && (
              <div className='flex justify-end'>
                <button
                  className='bg-[#fc4445] text-white text-sm font-semibold px-3 py-2 rounded-lg mt-3'
                  onClick={() => markOrderAsDone(order.id)}>
                  Done
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
