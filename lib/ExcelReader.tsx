import { NewPlanningItem, usePlanningStore } from '@/store/Production';
import React, { use, useState } from 'react';
import * as XLSX from 'xlsx';

interface PlaningItem {
  line: string;
  startTime: string;
  productionTime: string;
  finishTime: string;
  code: string;
  productName: string;
  quantity: string;
}

const ExcelReader = ({ setDataFrom }: any) => {
  const [data, setData] = useState<PlaningItem[]>([]);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target) {
          const bstr = evt.target.result;
          const workbook = XLSX.read(bstr, { type: 'binary' });

          // Assuming first sheet has your data
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          console.log(jsonData);

          // Process jsonData as in the previous example
          const processedData = processData(jsonData);
          setData(processedData);
          setDataFrom(processedData);
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const processData = (jsonData: any[]): PlaningItem[] => {
    let processedData: PlaningItem[] = [];
    let currentLine = 1; // Assuming your lines start at 1

    for (const row of jsonData) {
      const line = row;
      if (line.__EMPTY) {
        currentLine = parseInt(line.__EMPTY.split(' ')[1]);
        continue;
      }
      const startTime = line.time1;
      const productionTime = line.time2;
      const finishTime = line.time3;
      const code = line.code;
      const productName = line.product;
      const quantity = line.quantity;

      const item: PlaningItem = {
        line: currentLine.toString(),
        startTime,
        productionTime,
        finishTime,
        code,
        productName,
        quantity
      };
      processedData.push(item);
    }

    return processedData;
  };

  return (
    <div>
      <input
        type='file'
        onChange={handleFile}
      />
    </div>
  );
};

export default ExcelReader;
