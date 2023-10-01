import { Labels } from '@/store/LabelsStore';
import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const AddModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [aCode, setACode] = useState('');
  const [id, setId] = useState('');
  const [version, setVersion] = useState(1);
  const [web, setWeb] = useState('');
  const [rates, setRates] = useState(0);
  const [labels, setLabels] = useState<Labels[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  const dummyLabels = [
    { code: 'flm1003', quantity: 12, group: 'top' },
    { code: 'flm1007', quantity: 8, group: 'bottom' },
    { code: 'flm1011', quantity: 19, group: 'sticker' },
    { code: 'flm1015', quantity: 5, group: 'top' },
    { code: 'flm1020', quantity: 21, group: 'bottom' },
    { code: 'flm1012', quantity: 3, group: 'sticker' },
    { code: 'flm1005', quantity: 15, group: 'top' },
    { code: 'flm1018', quantity: 11, group: 'bottom' },
    { code: 'flm1001', quantity: 7, group: 'sticker' },
    { code: 'flm1022', quantity: 9, group: 'top' }
  ];

  const filteredLabels = dummyLabels.filter(
    (label) => label.group === selectedGroup
  );

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setACode('');
      setId('');
      setVersion(1);
      setWeb('');
      setRates(0);
      setLabels([]);
      setSelectedGroup('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onAdd({
      name,
      aCode,
      $id: id,
      version,
      web,
      rates,
      labels
    });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed top-10 sm:right-1 md:right-[30%] w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-20 border p-4 bg-white rounded overflow-auto shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Add Product</h2>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'>
          aCode
        </label>
        <input
          type='text'
          id='name'
          value={aCode}
          onChange={(e) => setACode(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'>
          version
        </label>
        <input
          type='number'
          id='name'
          value={version}
          onChange={(e) => setVersion(parseInt(e.target.value))}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'>
          web
        </label>
        <input
          type='string'
          id='name'
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'>
          rates
        </label>
        <input
          type='string'
          id='name'
          value={rates}
          onChange={(e) => setRates(parseInt(e.target.value))}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='group'>
          Group
        </label>
        <select
          id='group'
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'>
          <option value=''>Select Group</option>
          <option value='top'>Top</option>
          <option value='bottom'>Bottom</option>
          <option value='sticker'>Sticker</option>
        </select>
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='label'>
          Label
        </label>
        <select
          id='label'
          onChange={(e) =>
            setLabels([
              ...labels,
              filteredLabels.find((label) => label.code === e.target.value) ||
                {}
            ])
          }
          className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'>
          <option value=''>Select Label</option>
          {filteredLabels.map((label) => (
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
