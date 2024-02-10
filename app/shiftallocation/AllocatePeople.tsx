'use client';
import React, { ReactNode, useEffect } from 'react';
import * as XLSX from 'xlsx';

interface line {
  line: number;
  packers: number[];
  slicers: number[];
}
interface person {
  name: string;
  allocation: number[];
  position: string;
}
interface row {
  [person: string | number]: any;
}

const AllocatePeople = ({
  lineWithAllocation,
  peopleAvailable,
  setPeopleAvailable
}: {
  lineWithAllocation: any;
  peopleAvailable: any;
  setPeopleAvailable: (e: any) => void;
}) => {
  const [lines, setLines] = React.useState<any>({});
  const [extras, setExtras] = React.useState<any>([]);

  // Function to allocate people to lines
  const allocate = () => {
    let lines: line[] = [];
    const allocated = new Set();

    // Initialize lines from lineWithAllocation
    lineWithAllocation.forEach((line: line) => {
      lines[line.line] = { line: line.line, packers: [], slicers: [] };
    });

    const allocateBasedOnPreference = (preferenceIndex: any) => {
      peopleAvailable.forEach((person: any) => {
        const line = person.allocation[preferenceIndex];
        if (line && !allocated.has(person.name)) {
          const currentLine = lineWithAllocation.find(
            (l: line) => l.line === line
          );
          if (currentLine) {
            if (
              person.position === 'packer' &&
              lines[line].packers.length < currentLine.packers
            ) {
              lines[line].packers.push(person.name);
              allocated.add(person.name);
            } else if (
              person.position === 'slicer' &&
              lines[line].slicers.length < currentLine.slicers
            ) {
              lines[line].slicers.push(person.name);
              allocated.add(person.name);
            }
          }
        }
      });
    };

    allocateBasedOnPreference(0);
    allocateBasedOnPreference(1);

    const extras = peopleAvailable.filter(
      (person: any) => !allocated.has(person.name)
    );

    Object.keys(lines).forEach((line) => {
      const currentLine = lineWithAllocation.find(
        (l: line) => l.line === parseInt(line)
      );

      extras.forEach((person: any) => {
        if (
          lines[parseInt(line)].packers.length < currentLine.packers &&
          person.position === 'packer'
        ) {
          lines[parseInt(line)].packers.push(person.name);
          allocated.add(person.name);
          console.log('Allocated ' + person.name + ' to line ' + line);
        } else if (
          lines[parseInt(line)].slicers.length < currentLine.slicers &&
          person.position === 'slicer'
        ) {
          lines[parseInt(line)].slicers.push(person.name);
          allocated.add(person.name);
        }
      });
    });

    const updatedExtras = peopleAvailable
      .filter((person: any) => !allocated.has(person.name))
      .map((p: any) => p.name);

    return { lines, extras: updatedExtras };
  };
  const handelAllocate = () => {
    const { lines, extras } = allocate();

    setLines(lines);
    setExtras(extras);
  };

  // Function to handle export to Excel
  const exportToExcel = () => {
    const dataToExport: any[] = [];
    Object.entries(lines).forEach(([line, people]) => {
      (people as { packers: string[] }).packers.forEach((name) => {
        dataToExport.push({
          Index: dataToExport.length + 1,
          Name: name,
          Line: line,
          Position: 'Packer'
        });
      });
      (people as { slicers: string[] }).slicers.forEach((name) => {
        dataToExport.push({
          Index: dataToExport.length + 1,
          Name: name,
          Line: line,
          Position: 'Slicer'
        });
      });
    });
    extras.forEach((name: string) => {
      dataToExport.push({
        Index: dataToExport.length + 1,
        Name: name,
        Line: 'Extra',
        Position: ''
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Allocations');
    XLSX.writeFile(workbook, 'allocations.xlsx');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      // Parse data
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      // Get first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      // Convert to JSON
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Process data into desired format
      const processedData = (data as row[]).slice(1).map((row: row, index) => ({
        name: row[0],
        allocation: [parseInt(row[2]), parseInt(row[3])],
        position: row[1]
      }));
      setPeopleAvailable(processedData);
    };
    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    handelAllocate();
  }, [peopleAvailable]);

  return (
    <div className='container mx-auto p-4'>
      <div>
        <input
          type='file'
          onChange={() => {
            handleFileUpload(
              event as unknown as React.ChangeEvent<HTMLInputElement>
            );
            handelAllocate();
          }}
        />
      </div>
      <h2 className='text-xl font-semibold mb-4'>Allocations</h2>
      {lines &&
        Object.entries(lines).map(([line, people]) => (
          <div
            key={line}
            className='mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Line {line}</h3>
            <table className='min-w-full table-auto border-collapse border border-gray-200'>
              <thead>
                <tr>
                  <th className='border-b border-gray-200 bg-gray-100 p-2 text-left w-1/2'>
                    Position
                  </th>
                  <th className='border-b border-gray-200 bg-gray-100 p-2 text-left'>
                    Names
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-b border-gray-200 p-2 text-left'>
                    Packers
                  </td>
                  <td className='border-b border-gray-200 p-2 text-left'>
                    {((people as any).packers || []).join(', ')}
                  </td>
                </tr>
                <tr>
                  <td className='border-b border-gray-200 p-2'>Slicers</td>
                  <td className='border-b border-gray-200 p-2'>
                    {((people as any).slicers || []).join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      <div className='mt-6 max-w-sm'>
        <h3 className='text-lg font-semibold mb-2'>Extras</h3>
        <p className='p-2 bg-gray-100 border border-gray-200'>
          {extras.join(', ') || 'None'}
        </p>
      </div>
      <div>
        {/* ... existing JSX for displaying lines ... */}
        <button
          className='mt-4 p-2 bg-blue-500 text-white rounded'
          onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default AllocatePeople;
