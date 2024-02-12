import React, { useEffect, useState } from 'react';
import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/store/UserStore';

interface OrderCardProps {
  id: number;
  data: OrderObject[];
  setLoading: (loading: boolean) => void;
  loading?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  data,
  setLoading,
  loading
}) => {
  const [order, setOrder] = useState<OrderObject[]>([]);
  const user = useUserStore((state) => state.name);
  let allDone = false;

  useEffect(() => {
    setOrder(data);
  }, [data]);

  const markOrderAsDone = async (itemId: string) => {
    const updatedOrders = order.map((item) => {
      if (item.$id === itemId) {
        useOrderStore.getState().updateOrder(item.$id, { ...item, done: true });
        return { ...item, done: true };
      }

      return item;
    });

    setOrder(updatedOrders);
  };

  allDone = order.every((item) => item.done);

  return (
    <div className='bg-blue-100 rounded-lg shadow-lg m-3 pb-3 w-1/3 min-h-[140px] flex flex-col'>
      <div
        className={
          'bg-blue-800 text-white rounded-t-lg p-3 flex justify-between items-center text-xl font-semibold mb-2'
        }>
        <h2>Order Card #{id}</h2>
        <div className={`${allDone ? 'bg-yellow-600 p-2 rounded-md' : null}`}>
          <p className='text-sm'>{allDone ? 'Order is done' : ''}</p>
          <p className='text-xs text-gray-300'>
            {order.length > 0 ? order[0].date : ''}
          </p>
        </div>
      </div>
      {order.map((item) => (
        <div
          key={item.$id}
          className={`flex justify-between items-center py-2 border-b border-gray-200 ${
            item.priority ? 'bg-red-50 rounded-sm p-2' : ''
          }`}>
          <p className='text-lg text-gray-800 pl-3'>{item.webNumber}</p>
          <div className='flex items-center gap-2 pr-3'>
            {item.priority && (
              <ExclamationCircleIcon className='h-6 w-6 text-red-600' />
            )}
            {item.quantities}
            {user === 'storeslr@forzafoods.com' ? (
              <button
                className={`bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-md focus:outline-none focus:shadow-outline" ${
                  item.done ? 'hidden' : ''
                }`}
                onClick={() => markOrderAsDone(item.$id)}>
                Mark as Done
              </button>
            ) : null}
          </div>
        </div>
      ))}
      {user === 'storeshc@forzafoods.com' && !allDone ? (
        <div className='flex justify-end items-end flex-grow mt-2'>
          <button
            className='bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md focus:outline-none focus:shadow-outline mr-2'
            onClick={async () => {
              const removePromises = order.map((item) =>
                useOrderStore.getState().removeOrder(item.$id)
              );

              try {
                await Promise.all(removePromises);
                console.log('all orders removed');
                setLoading(!loading);
              } catch (error) {
                console.error('Error', error);
              }
            }}>
            Remove Order
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
