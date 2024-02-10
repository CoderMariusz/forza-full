import { redirect } from 'next/navigation';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <div className='mb-2'>
        <h1 className='text-3xl p-3 font-bold'>Order HC to Lr</h1>
        <h3 className='text-xl p-3 font-semibold'>Archive</h3>
        <hr />
      </div>
      {children}
    </div>
  );
}

export default layout;
