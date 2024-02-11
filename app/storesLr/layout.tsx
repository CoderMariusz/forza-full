import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>
      <h1 className='p-4 text-4xl font-bold'>Stores LR</h1>
      <hr />
      {children}
    </div>
  );
}

export default Layout;
