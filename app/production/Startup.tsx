import React, { useState } from 'react';

// Define types for your table data
type StartUpData = {
  line: number;
  productCode: string;
  dieset: string;
  depthOfForming: string;
  gripperPerSlicer: number;
  downholderPerSlicer: number;
  shearBar: string;
  topWeb: string;
  bottomWeb: string;
  additionalInfo: string;
};

// Example data for the table
const dummyData: StartUpData[] = [
  {
    line: 1,
    productCode: 'A1000',
    dieset: '6x2',
    depthOfForming: '30mm',
    gripperPerSlicer: 2,
    downholderPerSlicer: 2,
    shearBar: 'square',
    topWeb: 'Web1',
    bottomWeb: 'Web2',
    additionalInfo: ''
  }
  // ...more records
];

const StartUp: React.FC = () => {
  const [startUpData, setStartUpData] = useState<StartUpData[]>(dummyData);

  const handleAdditionalInfoChange = (index: number, value: string) => {
    const newData = [...startUpData];
    newData[index].additionalInfo = value;
    setStartUpData(newData);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-lg font-bold'>Startup Component</h1>
      <p className='mb-4'>Choose new plans</p>
      {/* Excel reader component will go here */}
      {/* <ExcelReaderComponent /> */}

      <table className='table-auto w-full text-left whitespace-no-wrap'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Line
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Product Code
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Dieset
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Depth of Forming
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Gripper per Slicer
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Downholder per Slicer
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Shear Bar
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Top Web
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Bottom Web
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Additional Information
            </th>
          </tr>
        </thead>
        <tbody>
          {startUpData.map((item, index) => (
            <tr key={index}>
              <td className='px-4 py-2'>{item.line}</td>
              <td className='px-4 py-2'>{item.productCode}</td>
              <td className='px-4 py-2'>{item.dieset}</td>
              <td className='px-4 py-2'>{item.depthOfForming}</td>
              <td className='px-4 py-2'>{item.gripperPerSlicer}</td>
              <td className='px-4 py-2'>{item.downholderPerSlicer}</td>
              <td className='px-4 py-2'>
                {item.shearBar ? 'square' : 'round'}
              </td>
              <td className='px-4 py-2'>{item.topWeb}</td>
              <td className='px-4 py-2'>{item.bottomWeb}</td>
              <td className='px-4 py-2'>
                <textarea
                  value={item.additionalInfo}
                  onChange={(e) =>
                    handleAdditionalInfoChange(index, e.target.value)
                  }
                  className='px-1 py-1 text-center'
                  placeholder='Enter info'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StartUp;
