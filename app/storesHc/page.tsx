'use client';
import { useStoresHcStore } from '@/store/StoresHc';
import { useUserStore } from '@/store/UserStore';
import React, { useEffect, useState } from 'react';
import { StoresHcObject } from '@/store/StoresHc';
import Webs from './Webs';
import AddModal from './AddModal';
import ChangeModal from './ChangeModal';
import * as XLSX from 'xlsx';
import { WebTrays, WebTraysStore, useWebTraysStore } from '@/store/WebTrays';
import { Product, useProductsStore } from '@/store/Products';

function StoresHcPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<StoresHcObject[]>([]);
  const [user] = useUserStore((state) => [state.name]);
  const [websData, setWebsData] = useState<WebTrays[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadDataDB, addStoresHcToDB, updateStoresHcToDB] = useStoresHcStore(
    (state) => [
      state.loadStoresHcFromDB,
      state.addStoresHcToDB,
      state.updateStoresHcToDB
    ]
  );
  const [currentView, setCurrentView] = useState('StoresHc');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);
  const [item, setItem] = useState<StoresHcObject>();

  const getBookmarkClass = (viewName: string) => {
    return currentView === viewName
      ? 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200'
      : 'bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200';
  };

  const exportToExcel = () => {
    const processedData = data.map((item) => ({
      ...item,
      quantities: item.quantities.join(', ') // Convert array to comma-separated string
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(processedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'DataExport.xlsx');
  };

  const loadData = async () => {
    const data = await loadDataDB();
    const websData = await useWebTraysStore.getState().loadWebTraysFromDB();
    const productsData = await useProductsStore.getState().loadProductsFromDB();
    setWebsData(websData);
    setProducts(productsData);
    setData(data);
  };

  const updateItemquantities = (
    itemId: string,
    newQuantities: Array<number>
  ) => {
    setData(
      data.map((item: StoresHcObject) =>
        item.id === itemId ? { ...item, quantities: newQuantities } : item
      )
    );
  };

  useEffect(() => {
    loadData().then(() => {
      setLoading(true);
    });
  }, [loading]);

  const sortByCode = (data: any, searchQuery: string) => {
    const searchTerm = searchQuery.toLowerCase(); // Convert the search query to lowercase for case-insensitive search

    const filteredData = data.filter(
      (item: any) =>
        item.code.toLowerCase().includes(searchTerm) ||
        (item.aCode && item.aCode.toLowerCase().includes(searchTerm))
    );

    return filteredData.sort((a: StoresHcObject, b: StoresHcObject) => {
      const aCodeToCompare = a.aCode || a.code;
      const bCodeToCompare = b.aCode || b.code;

      if (aCodeToCompare < bCodeToCompare) {
        return -1;
      }
      if (aCodeToCompare > bCodeToCompare) {
        return 1;
      }
      return 0;
    });
  };

  const addObject = (newObject: StoresHcObject) => {
    const existingWeb = data.find(
      (item) => item.aCode === newObject.aCode || item.code === newObject.code
    );

    if (existingWeb) {
      alert(
        'Web exists in the system. Please look it up in A-code or flm Code in searcher and change the quantities.'
      );
      return;
    } else {
      addStoresHcToDB(newObject);
      setLoading(false);
    }
  };

  const sortedData = sortByCode(data, searchQuery);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Store HC</h1>
      <hr className='mb-4' />

      <div className='mb-4 flex justify-between'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='p-2 border rounded'
        />
        {user === 'storeshc@forzafoods.com' && (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Web +
          </button>
        )}
      </div>

      <div className='mb-4 flex justify-center space-x-4'>
        <button
          className={getBookmarkClass('StoresHc')}
          onClick={() => setCurrentView('StoresHc')}>
          StoresHc
        </button>
        <button
          className={getBookmarkClass('Webs')}
          onClick={() => setCurrentView('Webs')}>
          Webs
        </button>
        <button
          className={getBookmarkClass('Trays')}
          onClick={() => setCurrentView('Trays')}>
          Trays
        </button>
      </div>

      {!loading && (
        <h3>
          <i className='fas fa-spinner fa-spin w-10 h-10 bg-red-200'></i>
          <span className='px-3'>Loading...</span>
        </h3>
      )}
      {currentView === 'StoresHc' && (
        <div className='container mx-auto p-4'>
          <h1 className='text-3xl font-bold mb-2'>Store</h1>
          <hr className='mb-4' />
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                <th className='py-3 px-6 text-left'>A-Code</th>
                <th className='py-3 px-6 text-left'>Code</th>
                <th className='py-3 px-6 text-left'>Name</th>
                <th className='py-3 px-6 text-center'>quantities</th>
                {user === 'storeshc@forzafoods.com' && (
                  <th className='py-3 px-6 text-center'>Actions</th>
                )}
              </tr>
            </thead>

            <tbody className='text-gray-600 text-sm font-light'>
              {sortedData &&
                sortedData.map((item: StoresHcObject, index: number) => (
                  <tr
                    key={index}
                    className='border-b border-gray-200 hover:bg-gray-100'>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      {item.aCode}
                    </td>
                    <td className='py-3 px-6 text-left whitespace-nowrap'>
                      {item.code}
                    </td>
                    <td className='py-3 px-6 text-left'>{item.name}</td>
                    <td className='py-3 px-6 text-center'>
                      {item.quantities.join(', ')}
                    </td>
                    {user === 'storeshc@forzafoods.com' && (
                      <td className='py-3 px-6 text-center'>
                        <button
                          onClick={() => {
                            setIsOpenChange(true);
                            setItem(item);
                          }}
                          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                          change
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {currentView === 'Webs' && <Webs />}

      <AddModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(e) => addObject(e)}
        products={products}
        webTraysData={websData}
      />
      <ChangeModal
        isOpen={isOpenChange}
        onClose={() => {
          setIsOpenChange(false);
        }}
        onEdit={(updateItem) => {
          console.log('edit');
          item && updateStoresHcToDB(updateItem);
          updateItemquantities(updateItem.id, updateItem.quantities);
          setIsOpenChange(false);
        }}
        item={item}
      />
      <div className='pt-4'>
        <button
          onClick={exportToExcel}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default StoresHcPage;
