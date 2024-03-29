// 'use client';
// import { useState, useEffect } from 'react';
// import { LabelItem, useLabelsStore } from '@/store/LabelsStore';
// import { useProductsStore } from '@/store/Products';
// import mergeTables from '@/lib/MargeTables';
// import EditModal from './EditModal';
// import { ProductionProduct, useProductionStore } from '@/store/Production';
// import GenerateReportButton from './GenerateReportButton';
// import WeeklyReport from './WeeklyReport';
// import { useWeeklyReportStore } from '@/store/WeeklyReportStore';

// interface Stores {
//   aCode?: string;
//   $id?: string;
//   packetInBox?: number;
//   labels?: LabelItem[];
// }

// function StoresPage() {
//   const [stores, setStores] = useState<Stores[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedStore, setSelectedStore] = useState<LabelItem[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [storesBookmark, setStoresBookmark] = useState(0);
//   const [production, setProduction] = useState<ProductionProduct[]>([]);

//   const [weeklyReport, setWeeklyReport] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const labelData = await useLabelsStore.getState().loadLabelsFromDB;
//       const ProductData = await useProductsStore.getState().loadProductsFromDB;

//       const data = mergeTables(ProductData, labelData);
//       useLabelsStore.getState().setLabels(data);
//       console.log('data from stores', useLabelsStore.getState().labels);

//       const labels = await useLabelsStore.getState().loadLabelsFromDB();
//       if (labels) {
//         setStores(labels);
//       }
//       setProduction(await useProductionStore.getState().setProductsFromDB());
//       const weekly = await useWeeklyReportStore
//         .getState()
//         .setWeeklyReportFromDB();
//       setWeeklyReport(weekly);
//     };

//     if (!loading) {
//       fetchData();
//       setLoading(true);
//     }
//   }, [stores, loading, weeklyReport]);

//   const handleRemove = (aCode: string | undefined) => {
//     // Handle remove logic here
//     setStores(stores.filter((store) => store.aCode && store.aCode !== aCode));
//   };

//   const handleOpen = (store: any, label: any) => {
//     const newStore = store.labels.filter((lab: any) => lab.code === label);

//     setSelectedStore(newStore || null);
//     setModalOpen(true);
//   };

//   const handleClose = () => {
//     setModalOpen(false);
//     setSelectedStore(null);
//   };

//   const onUpdate = async (quantities: number | null) => {
//     const updatedStores = stores.map((store) => {
//       const updatedLabels = store.labels?.map((label: any) => {
//         if (selectedStore && label.code === selectedStore[0]?.code) {
//           return { ...label, quantities };
//         } else {
//           return label;
//         }
//       });

//       // Sort labels by code within each store
//       updatedLabels?.sort((a, b) => a.code.localeCompare(b.code));

//       return { ...store, labels: updatedLabels };
//     });

//     stores.map((store) => {
//       store.labels?.map((label: any) => {
//         if (selectedStore && label.code === selectedStore[0]?.code) {
//           useLabels.getState().updateLabel(label.$id, quantities as number);
//         }
//       });

//       useLabels.getState();
//     });
//     setStores(updatedStores);
//   };

//   const calculateUpdatedStock = (
//     stocks: Stores[],
//     production: ProductionProduct[]
//   ) => {
//     // Make a deep copy of the stores array to avoid mutating the original
//     const updatedStores = JSON.parse(JSON.stringify(stocks));

//     const ProductionSortedArray = production.reduce(
//       (acc: ProductionProduct[], item) => {
//         const existing = acc.find(
//           (e): e is ProductionProduct => e.aCode === item.aCode
//         );

//         if (existing) {
//           existing.quantities = (existing.quantities ?? 0) + (item.quantities ?? 0);
//         } else {
//           acc.push({ ...item });
//         }

//         return acc;
//       },
//       []
//     );

//     ProductionSortedArray.forEach((prodItem) => {
//       const storeItem = updatedStores.find(
//         (store: Stores) => store.aCode === prodItem.aCode
//       );

//       if (!storeItem) {
//         console.warn(`No store found for aCode ${prodItem.aCode}`);
//         return;
//       }

//       const prodLabelQty = (prodItem.quantities ?? 0) * storeItem.packetInBox;

//       storeItem.labels.forEach((label: Labels) => {
//         label.quantities = (label.quantities ?? 0) - prodLabelQty;
//       });
//     });

//     return updatedStores;
//   };

//   const updatedStock = calculateUpdatedStock(stores, production);

//   const filteredStores = stores
//     .map((store) => {
//       // Check if the aCode matches or if any label's code matches
//       const isACodeMatch = store.aCode?.includes(searchQuery);
//       const matchedLabels = store.labels?.filter((label) =>
//         label.code?.includes(searchQuery)
//       );

//       // If the aCode matches, return the whole store
//       if (isACodeMatch) return store;
//       // If there are any matched labels, return a new store object with only matched labels
//       else if (matchedLabels && matchedLabels.length > 0)
//         return { ...store, labels: matchedLabels };

//       // If no match is found, return null
//       return null;
//     })
//     .filter(Boolean);

//   const flattenedStock = updatedStock.flatMap((item: any) => {
//     return item.labels.map((label: any) => ({
//       aCode: item.aCode,
//       labelCode: label.code,
//       quantities: label.quantities
//     }));
//   });

//   const filteredUpdate = flattenedStock.filter((item: any) => {
//     const isACodeMatch = item.aCode ? item.aCode.includes(searchQuery) : false;
//     const isLabelCodeMatch = item.labelCode
//       ? item.labelCode.includes(searchQuery)
//       : false;

//     return isACodeMatch || isLabelCodeMatch;
//   });

//   const changeStoresBookmark = (number: number) => {
//     if (number >= 0 && number <= 3) {
//       setStoresBookmark(number);
//     } else {
//       console.warn('Invalid bookmark number');
//     }
//   };

//   const updateWeeklyReportInDBandStores = async () => {
//     const updatedStores = [...stores]; // make a copy of current stores

//     const data = await useWeeklyReportStore.getState().setWeeklyReportFromDB();
//     setWeeklyReport(data);

//     // Flatten all production items from all weeks into a single array
//     const allProductionItems = data.flatMap((weekData) => weekData.production);

//     for (const item of allProductionItems) {
//       if (item.labelId === undefined) {
//         console.warn('item.$id is undefined');
//         continue;
//       } else {
//         await useLabels.getState().updateLabel(item.labelId, item.endquantities); // Update DB
//       }

//       // Update local state
//       for (const store of updatedStores) {
//         const label = store.labels?.find((l) => l.$id === item.labelId);
//         if (label) {
//           label.quantities = item.endquantities;
//         }
//       }
//     }

//     setStores(updatedStores);
//   };

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-3xl font-bold mb-4'>Stores</h1>

//       <div className='mb-4 flex justify-between'>
//         <input
//           type='text'
//           placeholder='Search by aCode or Label Code...'
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className='p-2 border rounded'
//         />
//         <button
//           onClick={() => setModalOpen(true)}
//           className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
//           Add Store +
//         </button>
//       </div>
//       <div>
//         <GenerateReportButton
//           stores={stores}
//           updatedStock={updatedStock}
//           updateWeeklyReport={updateWeeklyReportInDBandStores}
//         />
//       </div>

//       <hr className='mb-4' />
//       <div className='flex bg-slate-100 mb-2 rounded-md'>
//         <button
//           className='p-3 font-bold hover:bg-blue-300 transition-all duration-200 border-r-2 rounded-tl-md rounded-bl-md'
//           onClick={() => changeStoresBookmark(1)}>
//           Live Store
//         </button>
//         <button
//           className='p-3 px-4 font-bold hover:bg-blue-300 transition-all duration-200 border-r-2'
//           onClick={() => changeStoresBookmark(0)}>
//           Store
//         </button>
//         <button
//           className='p-3 px-4 font-bold hover:bg-blue-300 transition-all duration-200 border-r-2'
//           onClick={() => changeStoresBookmark(2)}>
//           WeeklyReport
//         </button>
//       </div>

//       {(() => {
//         switch (storesBookmark) {
//           case 0:
//             return (
//               <table className='min-w-full bg-white'>
//                 <thead className='bg-gray-800 text-white'>
//                   <tr>
//                     <th className='w-1/4 py-2'>A-Code</th>
//                     <th className='w-1/4 py-2'>Label Code</th>
//                     <th className='w-1/4 py-2'>quantities</th>

//                     <th className='w-1/4 py-2'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className='text-gray-700'>
//                   {filteredStores.map(
//                     (store) =>
//                       store &&
//                       store.labels?.map((label, idx) => (
//                         <tr key={idx}>
//                           <td className='text-center py-2'>{store.aCode}</td>
//                           <td className='text-center py-2'>{label.code}</td>
//                           <td className='text-center py-2'>{label.quantities}</td>
//                           <td className='text-center py-2 flex space-x-2'>
//                             <button
//                               onClick={() => handleOpen(store, label.code)}
//                               className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>
//                               Update
//                             </button>
//                             <button
//                               onClick={() => handleRemove(store.aCode)} // assuming you also want to use label code to remove a specific label
//                               className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                   )}
//                 </tbody>
//               </table>
//             );
//           case 1:
//             return (
//               <table className='w-full text-center'>
//                 <thead className='bg-gray-800 text-white'>
//                   <tr>
//                     <th className='w-1/4 py-2'>A-Code</th>
//                     <th className='w-1/4 py-2'>Label Code</th>
//                     <th className='w-1/4 py-2'>quantities</th>
//                     <th className='w-1/4 py-2'>Available to produce</th>
//                     <th className='w-1/4 py-2'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUpdate.map((item: any, index: any) => {
//                     return (
//                       <tr
//                         key={index}
//                         className='bg-gray-100'>
//                         <td className='py-2'>{item.aCode}</td>
//                         <td>{item.labelCode}</td>
//                         <td>{item.quantities}</td>
//                         <td>{item.labelCode}</td>
//                         <td>
//                           <button className='bg-blue-500 text-white px-4 py-1 rounded'>
//                             Action
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             );
//           case 2: {
//             return <WeeklyReport data={weeklyReport} />; // use the WeeklyReport component as a value
//           }

//           default:
//             return (
//               <table className='min-w-full bg-white'>
//                 <thead className='bg-gray-800 text-white'>
//                   <tr>
//                     <th className='w-1/4 py-2'>A-Code</th>
//                     <th className='w-1/4 py-2'>Label Code</th>
//                     <th className='w-1/4 py-2'>quantities</th>
//                     <th className='w-1/4 py-2'>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className='text-gray-700'>
//                   {filteredStores.map(
//                     (store) =>
//                       store &&
//                       store.labels?.map((label, idx) => (
//                         <tr key={idx}>
//                           <td className='text-center py-2'>{store.aCode}</td>
//                           <td className='text-center py-2'>{label.code}</td>
//                           <td className='text-center py-2'>{label.quantities}</td>
//                           <td className='text-center py-2 flex space-x-2'>
//                             <button
//                               onClick={() => handleOpen(store, label.code)}
//                               className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>
//                               Update
//                             </button>
//                             <button
//                               onClick={() => handleRemove(store.aCode)} // assuming you also want to use label code to remove a specific label
//                               className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                   )}
//                 </tbody>
//               </table>
//             );
//         }
//       })()}
//       {isModalOpen && (
//         <EditModal
//           isOpen={isModalOpen}
//           labelCode={(selectedStore && selectedStore[0]?.code) || ''}
//           initialquantities={(selectedStore && selectedStore[0]?.quantities) || 0}
//           onClose={handleClose}
//           onUpdate={onUpdate}
//         />
//       )}
//     </div>
//   );
// }

// export default StoresPage;

import React from 'react';

function page() {
  return <div>page</div>;
}

export default page;
