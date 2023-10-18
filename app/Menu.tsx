'use client';
import { useUserStore } from '@/store/UserStore';
import { linksList } from '@/lib/LinkList';
import { useState } from 'react';

function Menu() {
  const [name, setName] = useUserStore((state) => ['mariusz', state.setName]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='hidden md:flex flex-col gap-4 w-48 p-4 bg-gray-500 min-h-full'>
      <div className='flex justify-center items-center bg-blue-500 rounded-full w-16 h-16 '>
        <h2 className='text-white text-3xl font-bold'>
          {name.slice(0, 1).toUpperCase()}
        </h2>
      </div>

      <h2 className='text-gray-200 font-semibold text-lg'>Hi, {name}</h2>
      <nav>
        <ul className='flex flex-col gap-2 w-full'>
          {linksList(name, setName, setIsOpen)}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
