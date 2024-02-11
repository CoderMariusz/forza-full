import React, { useEffect, useState } from 'react';
import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/store/UserStore';

interface OrderCardProps {
  id: number;
  data: OrderObject[];
}

const OrderCard: React.FC<OrderCardProps> = ({ id, data }) => {
  const [order, setOrder] = useState<OrderObject[]>([]);
  const user = useUserStore((state) => state.name);
  let allDone = false;

  useEffect(() => {
    setOrder(data);
  }, [data]);

  const markOrderAsDone = async (itemId: string) => {
    const updatedOrders = order.map((item) => {
      if (item.$id === itemId) {
        // Załóżmy, że updateOrder zwraca zaktualizowany obiekt zamówienia
        useOrderStore.getState().updateOrder(item.$id, { ...item, done: true });
        return { ...item, done: true };
      }

      return item;
    });

    setOrder(updatedOrders);
  };
  console.log('order', user);

  // Sprawdzenie, czy wszystkie elementy zamówienia są oznaczone jako wykonane
  allDone = order.every((item) => item.done);
  console.log('allDone', allDone);

  return (
    <div className='bg-[#97caef] rounded-lg shadow-lg m-3 pb-3 py-2 w-1/3 min-h-[140px]'>
      <div
        className={`text-2xl font-bold mb-4 rounded-t-lg p-2 flex justify-between ${
          allDone ? 'bg-yellow-500' : ''
        }`}>
        <h2>Order Card #{id}</h2>
        <div>
          <p className='text-lg'>{allDone ? 'Order is done' : ''}</p>
          {/* Zakładamy, że data jest taka sama dla wszystkich elementów zamówienia */}
          <p className='text-xs'>{order.length > 0 ? order[0].date : ''}</p>
        </div>
      </div>
      {order.map((item) => (
        <div
          key={item.$id}
          className={`flex justify-between py-2 ${
            item.priority ? 'bg-red-400 rounded-sm p-2' : ''
          }`}>
          <p className='text-lg text-gray-800 pl-3'>{item.webNumber}</p>
          <div className='flex items-center gap-2 pr-3'>
            {item.priority && (
              <ExclamationCircleIcon className='h-7 w-7 text-red-500' />
            )}
            {item.quantities}
            {user === 'storeslr@forzafoods.com' ? (
              <button
                className={`bg-[#a3bb43] text-white text-sm font-semibold px-3 py-2 ${
                  item.done ? 'hidden' : ''
                }`}
                onClick={() => markOrderAsDone(item.$id)}>
                Mark as Done
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
