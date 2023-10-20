'use client';
import React, { useState } from 'react';

interface InputData {
  labelCode: string;
  $id: string;
  endQuantity: number;
}

interface Result {
  aCode: string;
  $id: string;
  labelCode: string;
  startQuantity: number;
  quantityAfterProduction: number;
  endQuantity: number;
}

const GenerateReportButton: React.FC<{
  updatedStock: any;
  stores: any;
  setWeeklyReport: any;
}> = ({ updatedStock, stores, setWeeklyReport }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputData, setInputData] = useState<InputData[]>([]);

  const findQuantity = (aCode: string, labelCode: string, source: any) => {
    const product = source.find((p: any) => p.aCode === aCode);
    const label = product?.labels.find((l: any) => l.code === labelCode);
    return label?.quantity || 0;
  };

  const handleSubmit = () => {
    console.log('inputData', inputData);

    const report: Result[] = inputData.map((data) => {
      const aCode =
        stores.find((s: any) =>
          s.labels.some((l: any) => l.code === data.labelCode)
        )?.aCode || '';
      const startQ = findQuantity(aCode, data.labelCode, stores);
      const afterProductionQ = findQuantity(
        aCode,
        data.labelCode,
        updatedStock
      );
      const wastedValue =
        ((afterProductionQ - data.endQuantity) / startQ) * 100;

      const labelId =
        stores
          .find((s: any) => s.aCode === aCode)
          ?.labels.find((l: any) => l.code === data.labelCode)?.$id || '';

      return {
        aCode: aCode,
        labelCode: data.labelCode,
        $id: labelId,
        startQuantity: startQ,
        quantityAfterProduction: afterProductionQ,
        endQuantity: data.endQuantity,
        wasted: wastedValue
      };
    });
    setWeeklyReport(report);

    setModalVisible(false);
  };

  const handleInputChange = (index: number, value: number) => {
    const updatedData = [...inputData];
    updatedData[index].endQuantity = value;
    setInputData(updatedData);
  };

  return (
    <>
      <button
        onClick={() => {
          const initialData = stores.flatMap((store: any) =>
            store.labels.map((label: any) => ({
              labelCode: label.code,
              endQuantity: 0
            }))
          );
          setInputData(initialData);
          setModalVisible(true);
        }}>
        Generate Report
      </button>

      {modalVisible && (
        <div className='fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='p-4 rounded-md bg-slate-200 shadow-lg flex flex-col gap-2'>
            {inputData.map((data, index) => (
              <div key={data.labelCode}>
                <label className='block text-md font-bold mb-2'>
                  {data.labelCode}:
                  <input
                    className='ml-2 w-20 p-1 border rounded'
                    type='number'
                    value={data.endQuantity}
                    onChange={(e) =>
                      handleInputChange(index, Number(e.target.value))
                    }
                  />
                </label>
              </div>
            ))}
            <button
              className='w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700'
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateReportButton;
