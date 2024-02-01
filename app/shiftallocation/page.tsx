'use client';
import React, { useState } from 'react';
import AllocatePeople from './AllocatePeople';

const PageAllocation: React.FC = () => {
  const [peopleAvailable, setPeopleAvailable] = useState([]);
  console.log(peopleAvailable);

  const lineWithAllocation = [
    { line: 1, packers: 2, slicers: 1 },
    { line: 2, packers: 3, slicers: 1 },
    { line: 3, packers: 2, slicers: 2 },
    { line: 4, packers: 1, slicers: 0 },
    { line: 5, packers: 3, slicers: 1 },
    { line: 6, packers: 2, slicers: 2 }
  ];

  return (
    // Your JSX code goes here
    <div>
      <h1>Page Allocation</h1>
      <AllocatePeople
        lineWithAllocation={lineWithAllocation}
        peopleAvailable={peopleAvailable}
        setPeopleAvailable={(data) => setPeopleAvailable(data)}
      />
    </div>
  );
};

export default PageAllocation;
