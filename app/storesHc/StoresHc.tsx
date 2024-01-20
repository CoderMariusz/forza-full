import { StoresHcObject } from '@/store/StoresHc';

function StoresHc(
  sortedData: StoresHcObject[],
  user: string,
  setIsOpenChange: Function,
  setItem: Function
) {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>Store</h1>
      <hr className='mb-4' />
      <table className='min-w-full table-auto'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>Code</th>
            <th className='py-3 px-6 text-left'>Name</th>
            <th className='py-3 px-6 text-center'>Quantity</th>
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
                  {item.code}
                </td>
                <td className='py-3 px-6 text-left'>{item.name}</td>
                <td className='py-3 px-6 text-center'>
                  {item.quantity.join(', ')}
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
  );
}

export default StoresHc;
