import { NewPlanningItem } from '@/store/Production';
import React, { useEffect, useState } from 'react';

type ProductionData = {
  acode: string;
  quantity: number;
  data: number;
};

type ProductionTableProps = {
  productionData: ProductionData[];
  planningData: NewPlanningItem[];
  className?: string;
};

type ProcentProductDone = {
  aCode: string;
  procentProductDone: number;
};

// Helper function to convert decimal hours to HH:MM format
const decimalToTime = (decimal: number): string => {
  const hours = Math.floor(decimal * 24);
  const minutes = Math.round((decimal * 1440) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

const ProductionTable: React.FC<ProductionTableProps> = ({
  productionData,
  planningData
}) => {
  const [filter, setFilter] = useState<number>(0);
  const [procentProductDone, setProcentProductDone] = useState<
    ProcentProductDone[]
  >([]);

  const handleFilterChange = (line: number) => {
    setFilter(line);
  };
  console.log('planningData', planningData);
  const filteredData = filter
    ? planningData.filter((data) => data.line === filter)
    : planningData;

  const lineNumbers = Array.from(
    new Set(planningData.map((data) => data.line))
  );

  console.log('ptoduction in table', productionData);

  const calculateCompletionPercentages = (
    productionData: ProductionData[],
    planningData: NewPlanningItem[]
  ): void => {
    let arrayResult: ProcentProductDone[] = [];
    planningData.forEach((plan) => {
      // Filter production data for matching acode and sum the quantities
      const totalProduced = productionData
        .filter((prod) => prod.acode === plan.code)
        .reduce((sum, record) => sum + record.quantity, 0);

      // Calculate the percentage completion
      const percentageCompleted = (totalProduced / plan.quantity) * 100;

      // Add the result to the array
      arrayResult.push({
        aCode: plan.code,
        procentProductDone: percentageCompleted
      });

      console.log(
        `Completion for acode ${plan.code}: ${percentageCompleted.toFixed(2)}%`
      );
    });

    const filteredProgressData = filterProductionProgress(arrayResult);
    setProcentProductDone(filteredProgressData);
  };

  const filterProductionProgress = (
    progressData: ProcentProductDone[]
  ): ProcentProductDone[] => {
    const nonZeroProgress = progressData.filter(
      (item) => item.procentProductDone > 0
    );

    const uniqueProgressMap = new Map<string, ProcentProductDone>();
    nonZeroProgress.forEach((item) => {
      const existingItem = uniqueProgressMap.get(item.aCode);
      if (
        !existingItem ||
        (existingItem &&
          item.procentProductDone > existingItem.procentProductDone)
      ) {
        uniqueProgressMap.set(item.aCode, item);
      }
    });

    return Array.from(uniqueProgressMap.values());
  };

  useEffect(() => {
    console.log('useeffect productionData');

    console.log(procentProductDone);

    calculateCompletionPercentages(productionData, planningData);
  }, [productionData]);

  useEffect(() => {
    console.log('useeffect planningData');

    console.log(procentProductDone);

    calculateCompletionPercentages(productionData, planningData);
  }, [planningData]);

  useEffect(() => {
    console.log('useeffect procentProductDone');
  }, [procentProductDone]);

  return (
    <div className='overflow-x-auto className'>
      <div className='flex justify-start space-x-2 mb-4'>
        <button
          onClick={() => handleFilterChange(0)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
          All Lines
        </button>
        {lineNumbers.map((line) => (
          <button
            key={line}
            onClick={() => handleFilterChange(line)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${
              filter === line ? 'bg-blue-700' : ''
            }`}>
            Line {line}
          </button>
        ))}
      </div>

      <table className='table-auto w-full text-left whitespace-no-wrap'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>
              Line
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Start Time
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Production Time
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Finish Time{' '}
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Code
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
              Product Name
            </th>
            <th className='px-4 py-2 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            // Find the corresponding progress item
            const progressItem = procentProductDone.find(
              (progress) => progress.aCode === item.code
            );
            const procentProduct = progressItem
              ? progressItem.procentProductDone
              : 0;

            return (
              <tr
                key={index}
                className='border-b'>
                <td className='px-4 py-2'>{item.line}</td>
                <td className='px-4 py-2'>{decimalToTime(item.startTime)}</td>
                <td className='px-4 py-2 relative'>
                  {procentProduct > 0 && (
                    <div
                      style={{
                        backgroundColor: '#55a3f6',
                        width: `${procentProduct}%`,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 0
                      }}></div>
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {item.code} - {procentProduct.toFixed(2)}%
                  </span>
                </td>
                <td className='px-4 py-2 z-100'>
                  {decimalToTime(item.finishTime)}
                </td>
                <td className='px-4 py-2'>{item.code}</td>
                <td className='px-4 py-2'>{item.productName}</td>
                <td className='px-4 py-2'>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTable;
