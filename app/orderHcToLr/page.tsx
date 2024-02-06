'use client';
import React, { useEffect, useState } from 'react';
import OrderModal from './OrderModal';
import OrderCard from './OrderCard';
import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';

const OrderHcToLrPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalWebOrders, setTotalWebOrders] = useState<OrderObject[]>([]);
  //const [fetchData, setFetchData] = useState(0);

  const loadOrders = async () => {
    const data = await useOrderStore.getState().loadOrders();

    if (data !== undefined && data) {
      setTotalWebOrders(data);
      console.log(data);
    }
  };

  function sortAndGroupByOrderId(orders: OrderObject[]): OrderObject[][] {
    // Sort the array based on orderId
    orders.sort((a, b) => {
      if (a.orderId !== undefined && b.orderId !== undefined) {
        return a.orderId - b.orderId;
      }
      return 0;
    });

    // Group elements with the same orderId together
    const grouped: OrderObject[][] = [];
    let currentGroup: OrderObject[] = [];
    let currentOrderId: number | undefined = undefined;

    orders.forEach((order) => {
      if (order.orderId !== currentOrderId) {
        if (currentGroup.length > 0) {
          grouped.push(currentGroup);
        }
        currentGroup = [order];
        currentOrderId = order.orderId;
      } else {
        currentGroup.push(order);
      }
    });

    // Add the last group if not empty
    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }

    return grouped;
  }
  // archive done orders

  const handleArchiveDoneOrders = () => {
    const doneOrders = totalWebOrders.filter((order) => order.done);

    console.log(doneOrders);
    doneOrders.forEach((order) => {
      useOrderStore
        .getState()
        .updateOrder(order.$id, { ...order, archive: true });
    });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // const fetchDataFun = async () => {
  //   console.log('fetching data');

  //   const data = await fetch('https://first-program.onrender.com/get_counter', {
  //     method: 'GET'
  //   }).then((res) => res.json());

  //   setFetchData(data.count);

  //   console.log(fetchData);
  // };

  useEffect(() => {
    loadOrders();

    setLoading(true);
  }, [loading]);

  const sortedOrders = sortAndGroupByOrderId(totalWebOrders);

  return (
    <div className='w-full'>
      <h1 className='text-3xl p-3 font-bold'>Order HC to Lr</h1>
      <hr />
      <div>
        {sortedOrders.map(
          (order, index) =>
            (order[0].archive === null || false) && (
              <OrderCard
                key={index}
                id={index}
                data={order}
              />
            )
        )}
      </div>

      <button
        onClick={handleOpenModal}
        className='bg-blue-400 hover:bg-blue-600 p-2 m-3 text-white font-semibold '>
        Add Order
      </button>
      <button
        className='p-2 m-3 bg-green-500 hover:bg-blue-600 hover:text-white duration-300  shadow-lg'
        onClick={() => {
          handleArchiveDoneOrders();
          console.log('Archive done orders');
        }}>
        Archive done orders
      </button>

      {/* Modal component */}
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-4'>
            <OrderModal
              setIsOpen={(e) => setIsOpen(e)}
              webOrdersLength={
                totalWebOrders.length > 0
                  ? totalWebOrders.findLastIndex(
                      (order) => order !== undefined
                    ) + 1
                  : 0
              }
              setLoading={(e) => setLoading(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHcToLrPage;
