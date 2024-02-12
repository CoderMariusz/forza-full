'use client';
import { OrderObject, useOrderStore } from '@/store/OrderHcToLr';
import React, { useEffect, useState } from 'react';
import OrderCard from '../OrderCard';

function OrderHcLRArchive() {
  const [loading, setLoading] = useState(false);
  const [archive, setArchive] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState<OrderObject[][]>([]);

  const loadOrders = async () => {
    const data = await useOrderStore.getState().loadOrders();
    if (data !== undefined && data) {
      setArchive(data);
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

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    setGroupedOrders(sortAndGroupByOrderId(archive));
  }, [archive]);
  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <div>
      <h1>Order HC to Lr</h1>
      <h3>Archive</h3>
      <hr />
      <div>
        {groupedOrders.map((group, index) =>
          group[0].archive === true ? (
            <OrderCard
              key={index}
              id={index}
              data={group}
              setLoading={() => console.log('loading')}
              loading={loading}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default OrderHcLRArchive;
