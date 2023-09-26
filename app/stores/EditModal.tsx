/* eslint-disable react-hooks/rules-of-hooks */
import { useStoreProduct } from '@/store/ProductsStore';
import React, { useState, useEffect } from 'react';

interface Store {
  aCode: string;
  topLabel: [string, number];
  bottomLabel: [string, number];
  sticker: [string, number];
  $id: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  store: Store;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, store }) => {
  if (!store) return null;
  const [id, setAId] = useState(store.$id);
  const [aCode, setACode] = useState(store.aCode);
  const [topLabel, setTopLabel] = useState(store.topLabel);
  const [bottomLabel, setBottomLabel] = useState(store.bottomLabel);
  const [sticker, setSticker] = useState(store.sticker);

  useEffect(() => {
    setACode(store.aCode);
    setTopLabel(store.topLabel);
    setBottomLabel(store.bottomLabel);
    setSticker(store.sticker);
    setAId(store.$id);
  }, [store]);

  const handleSave = async () => {
    console.log('Save Changes');
    const product: any = await useStoreProduct.getState().getProduct(id);
    product.aCode = aCode;
    product.topLabel = [topLabel[0], topLabel[1].toString()];
    product.bottomLabel[0] = [bottomLabel[0], bottomLabel[1].toString()];
    product.sticker = [sticker[0], sticker[1].toString()];
    await useStoreProduct.getState().editProduct(id, product);
    onclose;
  };

  console.log('EditModal', store);

  return isOpen ? (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 transition-opacity'
          aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <div className='mt-2'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='aCode'>
                    A-Code
                  </label>
                  <input
                    id='aCode'
                    value={aCode}
                    onChange={(e) => setACode(e.target.value)}
                    className='w-full px-2 py-1 border rounded mb-2'
                  />
                  <div className='flex gap-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='topLabelCode'>
                      Top Label Code
                    </label>
                    <input
                      id='topLabelCode'
                      value={topLabel[0]}
                      onChange={(e) =>
                        setTopLabel([e.target.value, topLabel[1]])
                      }
                      className='w-1/3 px-2 py-1 border rounded mr-2 mb-2'
                    />

                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='topLabelQuantity'>
                      Top Label Quantity
                    </label>
                    <input
                      id='topLabelQuantity'
                      value={topLabel[1]}
                      type='number'
                      onChange={(e) =>
                        setTopLabel([topLabel[0], Number(e.target.value)])
                      }
                      className='w-1/3 px-2 py-1 border rounded mb-2'
                    />
                  </div>

                  {/*... similarly add labels and adjust input fields for bottomLabel and sticker*/}
                  <div className='flex gap-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='bottomLabelCode'>
                      Bottom Label Code
                    </label>
                    <input
                      id='bottomLabelCode'
                      value={bottomLabel[0]}
                      onChange={(e) =>
                        setBottomLabel([e.target.value, bottomLabel[1]])
                      }
                      className='w-1/3 px-2 py-1 border rounded mr-2 mb-2'
                    />

                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='bottomLabelQuantity'>
                      Bottom Label Quantity
                    </label>
                    <input
                      id='bottomLabelQuantity'
                      value={bottomLabel[1]}
                      type='number'
                      onChange={(e) =>
                        setBottomLabel([bottomLabel[0], Number(e.target.value)])
                      }
                      className='w-1/3 px-2 py-1 border rounded mb-2'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='stickerCode'>
                      Sticker Code
                    </label>
                    <input
                      id='stickerCode'
                      value={sticker[0]}
                      onChange={(e) => setSticker([e.target.value, sticker[1]])}
                      className='w-1/3 px-2 py-1 border rounded mr-2'
                    />

                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='stickerQuantity'>
                      Sticker Quantity
                    </label>
                    <input
                      id='stickerQuantity'
                      value={sticker[1]}
                      type='number'
                      onChange={(e) =>
                        setSticker([sticker[0], Number(e.target.value)])
                      }
                      className='w-1/3 px-2 py-1 border rounded'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              onClick={handleSave}
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
              Save
            </button>
            <button
              onClick={onClose}
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditModal;
