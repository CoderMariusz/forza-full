// import React, { useState } from 'react';

// interface Product {
//   name: string;
//   aCode: string;
//   labels: { code: string; group: string; quantities: number }[];
//   packetInBox: number;
//   // ... other fields can be added as required
// }

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onAdd: (production: {
//     aCode: string;
//     quantities: number;
//     date: Date;
//   }) => void;
//   products: Product[];
// }

// const AddModal: React.FC<Props> = ({ isOpen, onClose, onAdd, products }) => {
//   const [aCode, setACode] = useState<string>('');
//   const [quantities, setquantities] = useState<number | string>('');
//   const [date, setDate] = useState<string>(
//     new Date().toISOString().split('T')[0]
//   );
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = () => {
//     const product = products.find((prod) => prod.aCode === aCode);
//     if (!product) {
//       setError('Invalid aCode');
//       return;
//     }

//     setError(null);

//     onAdd({
//       aCode,
//       quantities: Number(quantities),
//       date: new Date(date)
//     });
//     setACode('');
//     setquantities('');

//     function formatDate(inputStr: string | number | Date) {
//       const date = new Date(inputStr); // create a Date object
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
//       const year = date.getFullYear();

//       return `${day}/${month}/${year}`;
//     }

//     setDate(formatDate(new Date().toISOString().split('T')[0]));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex items-center justify-center'>
//       <div className='bg-white rounded p-8 m-4 max-w-xs mx-auto'>
//         <h2 className='mb-4 text-2xl font-bold text-gray-800'>
//           Add Production
//         </h2>

//         {error && <div className='mb-4 text-red-500'>{error}</div>}

//         <div className='mb-4'>
//           <label
//             className='block text-sm font-bold mb-2'
//             htmlFor='aCode'>
//             aCode
//           </label>
//           <select
//             value={aCode}
//             onChange={(e) => setACode(e.target.value)}
//             className='w-full p-2 border rounded'>
//             <option value=''>Select aCode</option>
//             {products.map((prod) => (
//               <option
//                 key={prod.aCode}
//                 value={prod.aCode}>
//                 {prod.aCode}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className='mb-4'>
//           <label
//             className='block text-sm font-bold mb-2'
//             htmlFor='quantities'>
//             quantities
//           </label>
//           <input
//             type='number'
//             id='quantities'
//             value={quantities}
//             onChange={(e) => setquantities(e.target.value)}
//             className='w-full p-2 border rounded'
//           />
//         </div>

//         <div className='mb-4'>
//           <label
//             className='block text-sm font-bold mb-2'
//             htmlFor='date'>
//             Date
//           </label>
//           <input
//             type='date'
//             id='date'
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className='w-full p-2 border rounded'
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className='w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700'>
//           Add Production
//         </button>

//         <button
//           onClick={onClose}
//           className='w-full p-2 bg-red-600 text-white rounded hover:bg-red-700'>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddModal;
