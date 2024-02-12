import {
  NewOrderObject,
  OrderObject,
  useOrderStore
} from '@/store/OrderHcToLr';
import { WebTrays } from '@/store/WebTrays';
import React, { use, useState } from 'react';

interface OrderModalProps {
  webTrays: WebTrays[];
  setIsOpen: (e: boolean) => void;
  webOrdersLength: number;
  setLoading: (e: boolean) => void;
  loading: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  setIsOpen,
  webTrays,
  webOrdersLength,
  setLoading,
  loading
}) => {
  const [order, setOrder] = useState<NewOrderObject[]>([]);
  const [webNumber, setWebNumber] = useState('');
  const [priority, setPriority] = useState(false);
  const [quantities, setQuantities] = useState(0);
  const submitOrderToDB = (e: NewOrderObject, orderId: number) => {
    useOrderStore.getState().addOrder({
      priority: e.priority,
      webNumber: e.webNumber,
      quantities: e.quantities,
      done: false,
      orderId: orderId
    });
  };

  const handleAddOrder = () => {
    if (webNumber === '' || quantities === 0) {
      return;
    }

    const newOrder: NewOrderObject = {
      priority,
      webNumber,
      quantities,
      done: false,
      orderId: webOrdersLength + 1
    };
    setOrder([...order, newOrder]);
    setPriority(false);
    setWebNumber('');
    setQuantities(0);
    setWebNumber('');
    setQuantities(0);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setLoading(!loading);
    setOrder([]);
  };

  const handleSubmitOrder = () => {
    // Submit order to database
    const orderToSubmit = order.filter(
      (order) => order.webNumber !== '' || order.quantities !== 0
    );

    orderToSubmit.forEach((order) => submitOrderToDB(order, order.orderId));

    // Submit order to backend
    handleCloseModal();
    setLoading(false);
  };

  return (
    <div>
      <h2 className='text-3xl font-bold mb-4'>Add Order</h2>
      <div>
        <label
          className='font-semibold'
          htmlFor='webNumber'>
          Web Number:
        </label>
        <select
          name='webNumber'
          onChange={(e) => setWebNumber(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id=''>
          <option value=''>Select Web Number</option>
          {webTrays.map((tray) => (
            <option
              key={tray.$id}
              value={tray.code}>
              {`${tray.code}     ${tray.name}`}
            </option>
          ))}
        </select>
        <label
          htmlFor='priority'
          className='font-semibold'>
          Priority
        </label>
        <input
          type='checkbox'
          id='priority'
          className='m-3'
          checked={priority}
          onChange={(e) => setPriority(e.target.checked)}
        />
      </div>
      <label
        htmlFor='quantities'
        className='font-semibold'>
        Quantities:
      </label>
      <input
        type='number'
        id='quantities'
        value={quantities}
        onChange={(e) => setQuantities(Number(e.target.value))}
        className='border border-gray-300 rounded-md p-2 m-2'
      />

      <button
        onClick={handleAddOrder}
        className='bg-blue-700 hover:bg-blue-900 text-white rounded-md py-2 px-4 mb-4'>
        Add
      </button>

      <table className='w-full border border-gray-300 rounded-md'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='p-2'>Web Number</th>
            <th className='p-2'>Quantities</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item: NewOrderObject, index: number) => (
            <tr key={index}>
              <td className='p-2'>{item.webNumber}</td>
              <td className='p-2'>{item.quantities}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between mt-4'>
        <button
          className='bg-blue-700 hover:bg-blue-900 text-white rounded-md py-2 px-4'
          onClick={handleSubmitOrder}>
          Submit
        </button>

        <button
          className='bg-red-700 hover:bg-red-900 text-white rounded-sm py-2 px-4'
          onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
