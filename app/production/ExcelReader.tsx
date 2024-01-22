'use client';
import { useProductionProductStore } from '@/store/Production';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader({ dataFromPage, setData }: any) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });

        // Get the first worksheet (assuming data is in the first sheet)
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];

        // Convert array of arrays
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Assuming data is in columns A, B, and C and we skip the header row
        const formattedData = data.slice(1).map((row: any) => ({
          aCode: row[0], // A
          quantity: row[1], // B
          date: row[2] // C
        }));

        const formatDate = (dateStr: any) => {
          const [day, month, year] = dateStr.split('/');
          return `${year}-${month}-${day}`;
        };

        formattedData.forEach(async (row: any) => {
          try {
            await useProductionProductStore.getState().createProduct({
              aCode: row.aCode,
              quantity: row.quantity,
              date: formatDate(row.date)
            });

            const withAddProduct = [...dataFromPage, ...formattedData];

            setData(withAddProduct);
          } catch (e) {
            console.log(e);
          }
        });
        setSelectedFile(file.name); // Just to show the file name after selection
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className='flex flex-col items-center mt-10'>
      <label className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-700 hover:text-white'>
        <svg
          className='w-8 h-8'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'>
          <path d='M9 11V6H5l7-7 7 7h-4v5h4l-3 4H8l-3-4h4zM3 17v2h14v-2H3z' />
        </svg>
        <span className='ml-2 text-base leading-normal'>
          Select an Excel file
        </span>
        <input
          type='file'
          className='hidden'
          accept='.xls,.xlsx'
          onChange={handleFileChange}
        />
      </label>
      {selectedFile && (
        <div className='mt-2'>
          <p className='text-gray-700'>{selectedFile}</p>
        </div>
      )}
    </div>
  );
}

export default ExcelReader;
