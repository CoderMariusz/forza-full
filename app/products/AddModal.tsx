import { Labels } from '@/store/LabelsStore';
import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
  existingLabels?: any;
}

const AddModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAdd,
  existingLabels
}) => {
  const [name, setName] = useState('');
  const [aCode, setACode] = useState('');
  const [version, setVersion] = useState(1);
  const [web, setWeb] = useState('');
  const [rates, setRates] = useState(0);
  const [labels, setLabels] = useState<Labels[]>([]);

  const filteredLabelsTop = existingLabels.filter(
    (label: any) => label.group === 'top'
  );
  const filteredLabelsBottom = existingLabels.filter(
    (label: any) => label.group === 'bottom'
  );
  const filteredLabelsSticker = existingLabels.filter(
    (label: any) => label.group === 'sticker'
  );

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setACode('');
      setVersion(1);
      setWeb('');
      setRates(0);
      setLabels([]);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onAdd({
      name,
      aCode,
      version,
      web,
      rates,
      labels
    });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-4 max-h-full sm:right-1 md:right-[30%] w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-20 border p-4 bg-white rounded overflow-auto shadow-lg'>
      <h2 className='text-xl font-bold mb-2 text-gray-800'>Add Product</h2>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='name'>
          aCode
        </label>
        <input
          type='text'
          id='name'
          value={aCode}
          onChange={(e) => setACode(e.target.value)}
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='name'>
          version
        </label>
        <input
          type='number'
          id='name'
          value={version}
          onChange={(e) => setVersion(parseInt(e.target.value))}
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='name'>
          web
        </label>
        <input
          type='string'
          id='name'
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='name'>
          rates
        </label>
        <input
          type='string'
          id='name'
          value={rates}
          onChange={(e) => setRates(parseInt(e.target.value))}
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='labelTop'>
          Label Top
        </label>
        <select
          id='labelTop'
          onChange={(e) =>
            setLabels([
              ...labels,
              filteredLabelsTop.find(
                (label: any) => label.code === e.target.value
              ) || {}
            ])
          }
          className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'>
          <option value=''>Select Label</option>
          {filteredLabelsTop.map((label: any) => (
            <option
              key={label.code}
              value={label.code}>
              {label.code}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='labelBottom'>
          Label Bottom
        </label>
        <select
          id='labelBottom'
          onChange={(e) =>
            setLabels([
              ...labels,
              filteredLabelsBottom.find(
                (label: any) => label.code === e.target.value
              ) || {}
            ])
          }
          className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'>
          <option value=''>Select Label</option>
          {filteredLabelsBottom.map((label: any) => (
            <option
              key={label.code}
              value={label.code}>
              {label.code}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold '
          htmlFor='labelSticker'>
          Label Sticker
        </label>
        <select
          id='labelSticker'
          onChange={(e) =>
            setLabels([
              ...labels,
              filteredLabelsSticker.find(
                (label: any) => label.code === e.target.value
              ) || {}
            ])
          }
          className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'>
          <option value=''>Select Label</option>
          {filteredLabelsSticker.map((label: any) => (
            <option
              key={label.code}
              value={label.code}>
              {label.code}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
        Add Product
      </button>
      <button
        onClick={onClose}
        className='w-full bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
        Cancel
      </button>
    </div>
  );
};

export default AddModal;
