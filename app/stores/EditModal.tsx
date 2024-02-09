// import React, { useState } from 'react';

// interface Props {
//   isOpen: boolean;
//   labelCode: string;
//   initialquantities: number;
//   onClose: () => void;
//   onUpdate: (quantities: number | null) => void;
// }

// const EditModal: React.FC<Props> = ({
//   isOpen,
//   labelCode,
//   initialquantities,
//   onClose,
//   onUpdate
// }) => {
//   const [quantities, setquantities] = useState(initialquantities);

//   const handleUpdate = () => {
//     onUpdate(quantities);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
//       <div className='bg-white p-4 rounded-md'>
//         <h2 className='text-xl font-bold mb-4'>
//           Update quantities for {labelCode}
//         </h2>

//         <div className='mb-4'>
//           <label
//             htmlFor='quantities'
//             className='block text-gray-700 text-sm font-bold mb-2'>
//             quantities:
//           </label>
//           <input
//             type='number'
//             id='quantities'
//             value={quantities}
//             onChange={(e) => setquantities(Number(e.target.value))}
//             className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//           />
//         </div>

//         <div className='flex justify-end space-x-4'>
//           <button
//             onClick={onClose}
//             className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'>
//             Cancel
//           </button>
//           <button
//             onClick={handleUpdate}
//             className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;
