'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/UserStore';
import { linksList } from '@/lib/LinkList';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useUserStore((state) => [state.name, state.setName]);

  return (
    <div className='block md:hidden fixed top-0 right-0'>
      <div className='z-50 fixed top-1 right-2'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600'>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transform fixed top-0 right-0 w-64 h-full bg-gray-100 shadow-lg p-4 transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col gap-4 mx-4 mt-4'>
          <h2 className='text-gray-800 font-semibold text-lg'>
            Hi, You need to be login
          </h2>
          <nav>
            <ul className='flex flex-col gap-2 mx-2'>
              {linksList(name, setName)}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
