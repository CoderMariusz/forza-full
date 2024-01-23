'use client';
import { ChillHcObject, useChillHcState } from '@/store/ChillHc';
import { useUserStore } from '@/store/UserStore';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import AddRMItemModal from './AddModal';
import EditRMItemModal from './EditModal';
import RepackTable from './RepackTable';
import EditRepackItemModal from './EditModalRepack';
import AddRepackItemModal from './AddModalRepack';
import { rm } from 'fs';

// Define a mock RMObject type (adjust as per your actual data structure)

function ChillStockPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useUserStore((state) => [state.name]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);
  const [isOpenRepack, setIsOpenRepack] = useState(false);
  const [isOpenRepackChange, setIsOpenRepackChange] = useState(false);
  const [data, setData] = useState<ChillHcObject[]>([]); // Replace with your RMObject type
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<ChillHcObject>();
  const [currentView, setCurrentView] = useState('ChillHc');
  const [repacks, setRepacks] = useState<ChillHcObject[]>([]);

  // Function to load RM data (you can replace this with your actual data loading logic)
  const loadRMData = async () => {
    const chillHc = await useChillHcState.getState().loadChillHcFromDB();
    setData(chillHc);
  };

  // Function to export RM data to Excel
  const exportToExcel = () => {
    const processedData = data.map((item) => ({
      ...item,
      // Convert date to a formatted string if needed
      date: item.date
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(processedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'RMDataExport.xlsx');
  };

  const addObject = async (
    rmCode: string,
    name: string,
    date: string,
    weight: number,
    id: string
  ) => {
    const chillHc = await useChillHcState.getState().addChillHcToDB({
      rmCode,
      name,
      date,
      weight,
      id
    });
    setData([...data, chillHc]);
    setLoading(false);
  };

  const addObjectRepack = async (obj: any) => {
    const chillHc = await useChillHcState.getState().addChillHcToDB({
      ...obj
    });
    setData([...data, chillHc]);
    setLoading(false);
  };

  const removeObject = async (id: string) => {
    await useChillHcState.getState().removeChillHcFromDB(id);
    setData(data.filter((item) => item.id !== id));
    setLoading(false);
  };

  const updateObject = async (item: ChillHcObject) => {
    const { id, rmCode, name, date, weight } = item;

    await useChillHcState.getState().updateChillHcToDB({
      id,
      rmCode,
      name,
      date,
      weight
    });
    setData(
      data.map((item) =>
        item.id === id ? { ...item, rmCode, name, date, weight } : item
      )
    );
    setLoading(false);
  };

  const getBookmarkClass = (viewName: string) => {
    return currentView === viewName
      ? 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200'
      : 'bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200';
  };

  const sortByCode = (data: any, searchQuery: string) => {
    const searchTerm = searchQuery.toLowerCase(); // Convert the search query to lowercase for case-insensitive search

    const filteredData = data.filter((item: any) => {
      return (
        (item.repack === null &&
          item.rmCode?.toLowerCase().includes(searchTerm)) ||
        (item.repack === null &&
          item.date &&
          item.date.toLowerCase().includes(searchTerm))
      );
    });

    return filteredData.sort((a: ChillHcObject, b: ChillHcObject) => {
      const aCodeToCompare = a.name || a.rmCode;
      const bCodeToCompare = b.name || b.rmCode;

      if (aCodeToCompare < bCodeToCompare) {
        return -1;
      }
      if (aCodeToCompare > bCodeToCompare) {
        return 1;
      }
      return 0;
    });
  };

  const loadRepackData = () => {
    const repacks = data.filter((item) => item.repack === true);
    setRepacks(repacks);
  };

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      useUserStore.getState().loginUserBySession(session);
    }

    loadRMData().then(() => {
      loadRepackData();
      setLoading(true);
    });
  }, [loading]);

  const sortedData = sortByCode(data, searchQuery);

  // Render the Chill Stock page
  console.log(user);

  if (user === '') {
    console.log('no user');

    return <div>You need to be log in!</div>;
  }
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Chill Stock</h1>
      <hr className='mb-4' />

      {/* Add your search input and button here similar to StoresHcPage */}
      <div className='mb-4 flex justify-between'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
        />
        {user === 'process@forzafoods.com' && currentView === 'ChillHc' && (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Material +
          </button>
        )}
        {user === 'process@forzafoods.com' && currentView === 'Repacks' && (
          <button
            onClick={() => {
              setIsOpenRepack(true);
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Repack +
          </button>
        )}
      </div>
      <div className='mb-4 flex justify-center space-x-4'>
        <button
          className={getBookmarkClass('ChillHc')}
          onClick={() => setCurrentView('ChillHc')}>
          ChillHc
        </button>
        <button
          className={getBookmarkClass('Repacks')}
          onClick={() => setCurrentView('Repacks')}>
          Repacks
        </button>
        <button
          className={getBookmarkClass('Trays')}
          onClick={() => setCurrentView('Trays')}>
          Trays
        </button>
      </div>

      <div className='mb-4'>
        <button
          onClick={exportToExcel}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Export to Excel
        </button>
      </div>

      {/* Render the RM data table */}
      {loading && currentView === 'ChillHc' && (
        <table className='min-w-full table-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>RM-Code</th>
              <th className='py-3 px-6 text-left'>Ticket Id</th>
              <th className='py-3 px-6 text-left'>Date</th>
              <th className='py-3 px-6 text-left'>Weight</th>
              {user === 'process@forzafoods.com' ? (
                <th className='py-3 px-6 text-left'>Actions</th>
              ) : null}
            </tr>
          </thead>

          <tbody className='text-gray-600 text-sm font-light'>
            {sortedData.map((item: ChillHcObject, index: number) => (
              <tr
                key={index}
                className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {item.rmCode}
                </td>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {item.name}
                </td>
                <td className='py-3 px-6 text-left'>{item.date}</td>
                <td className='py-3 px-6 text-left'>{item.weight}</td>
                {user === 'process@forzafoods.com' ? (
                  <td className='py-3 px-6 text-left'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => {
                        setItem(item);

                        setIsOpenChange(true);
                      }}>
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2'
                      onClick={() => removeObject(item.id)}>
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {loading && currentView === 'Repacks' && (
        <RepackTable
          data={repacks}
          setItem={(item) => setItem(item)}
          setIsOpenChange={() => {
            setIsOpenRepackChange(true);
          }}
          removeObject={(id) => removeObject(id)}
          user={user}
        />
      )}
      <AddRMItemModal
        isOpen={isOpen}
        onClose={setIsOpen}
        onAdd={(item: ChillHcObject) =>
          addObject(item.rmCode, item.name, item.date, item.weight, item.id)
        }
      />
      <EditRMItemModal
        isOpen={isOpenChange}
        onClose={() => setIsOpenChange(false)}
        onEdit={(updateItem) => {
          updateObject(updateItem);
          setIsOpenChange(false);
        }}
        item={item}
      />
      <AddRepackItemModal
        isOpen={isOpenRepack}
        onClose={() => setIsOpenRepack(false)}
        onAdd={(obj) => addObjectRepack(obj)}
      />
      <EditRepackItemModal
        isOpen={isOpenRepackChange}
        onClose={() => setIsOpenRepackChange(false)}
        onEdit={(updateItem) => {
          updateObject(updateItem);
          setIsOpenRepack(false);
        }}
        item={item}
      />
    </div>
  );
}

export default ChillStockPage;
