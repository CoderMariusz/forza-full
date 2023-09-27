import Link from 'next/link';

function ProductionPage() {
  const dummyData = [
    { aCode: 'a-0001', quantity: 100, date: '2023-10-01' },
    { aCode: 'a-0001', quantity: 200, date: '2023-10-02' },
    { aCode: 'a-0002', quantity: 150, date: '2023-10-03' },
    { aCode: 'a-0002', quantity: 250, date: '2023-10-04' }
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Production</h1>
      {/* ... additional components or links ... */}
      <table className='min-w-full bg-white'>
        <thead className='bg-gray-800 text-white'>
          <tr>
            <th className='w-1/4 py-2'>A-Code</th>
            <th className='w-1/4 py-2'>Quantity</th>
            <th className='w-1/4 py-2'>Date</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {dummyData.map((data, index) => (
            <tr key={index}>
              <td className='text-center py-2'>{data.aCode}</td>
              <td className='text-center py-2'>{data.quantity}</td>
              <td className='text-center py-2'>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductionPage;
