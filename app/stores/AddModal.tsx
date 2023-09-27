import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (store: Store) => void;
}

interface Store {
  $id: string; // $id should be optional as it might not exist for a new store.
  aCode: string;
  topLabel: [string, number];
  bottomLabel: [string, number];
  sticker: [string, number];
}

const AddModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  // You can create initial state for each field
  const [aCode, setACode] = useState('');
  const [topLabel, setTopLabel] = useState(['', 0] as [string, number]);
  const [bottomLabel, setBottomLabel] = useState(['', 0] as [string, number]);
  const [sticker, setSticker] = useState(['', 0] as [string, number]);

  const handleAdd = () => {
    onAdd({ aCode, topLabel, bottomLabel, sticker, $id: '' });
  };

  return isOpen ? (
    <div className='fixed left-auto right-auto z-10 inset-0 overflow-y-auto'>
      {/* ... other divs and structural elements */}
      <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
          <h2 className='text-xl font-bold mb-4 text-center'>Add Product</h2>
          <hr className='mb-4' /> {/* Line between title and fields */}
          <div className='sm:flex sm:items-start flex-col'>
            <div className='flex flex-row'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2 whitespace-nowrap mr-3'
                htmlFor='aCode'>
                A-Code
              </label>
              <input
                id='aCode'
                value={aCode}
                onChange={(e) => setACode(e.target.value)}
                className='w-full px-2 py-1 border rounded mb-2'
              />
            </div>

            <div className='flex gap-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='topLabelCode'>
                Top Label Code
              </label>
              <input
                id='topLabelCode'
                value={topLabel[0]}
                onChange={(e) => setTopLabel([e.target.value, topLabel[1]])}
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
        <hr className='mb-4' /> {/* Line above the buttons */}
        <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
          <button
            onClick={handleAdd}
            type='button'
            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
            Add
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
  ) : null;
};

export default AddModal;
