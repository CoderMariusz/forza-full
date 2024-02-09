import {
  NewOrderObject,
  OrderObject,
  useOrderStore
} from '@/store/OrderHcToLr';
import React, { use, useState } from 'react';

interface OrderModalProps {
  setIsOpen: (e: boolean) => void;
  webOrdersLength: number;
  setLoading: (e: boolean) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  setIsOpen,
  webOrdersLength,
  setLoading
}) => {
  const [order, setOrder] = useState<NewOrderObject[]>([]);
  const [webNumber, setWebNumber] = useState('');
  const [quantities, setQuantities] = useState(0);
  const submitOrderToDB = (e: NewOrderObject, orderId: number) => {
    useOrderStore.getState().addOrder({
      webNumber: e.webNumber,
      quantities: e.quantities,
      done: false,
      orderId: orderId
    });
  };

  const handleAddOrder = () => {
    const newOrder: NewOrderObject = {
      webNumber,
      quantities,
      done: false,
      orderId: webOrdersLength + 1
    };
    setOrder([...order, newOrder]);
    setWebNumber('');
    setQuantities(0);
    setWebNumber('');
    setQuantities(0);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setLoading(false);
    setOrder([]);
  };

  const handleSubmitOrder = () => {
    // Submit order to database

    order.forEach((order) => submitOrderToDB(order, order.orderId));

    // Submit order to backend
    handleCloseModal();
    setLoading(false);
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Add Order</h2>
      <label htmlFor='webNumber'>Web Number:</label>
      <input
        type='text'
        id='webNumber'
        value={webNumber}
        onChange={(e) => setWebNumber(e.target.value)}
        className='border border-gray-300 rounded-md p-2 m-2'
      />
      <label htmlFor='quantities'>Quantities:</label>
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
