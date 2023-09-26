'use client';
import { account, avatars } from '@/appwrite';
import { useUserStore } from '@/store/UserStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import { linksList } from '@/lib/LinkList';

function Menu() {
  const [name, setName] = useUserStore((state) => [state.name, state.setName]);

  return (
    <div className='hidden md:flex flex-col gap-4 mx-4 mt-4 w-48 p-4 bg-gray-100 rounded-lg shadow-lg'>
      <div className='flex justify-center items-center bg-blue-500 rounded-full w-16 h-16 '>
        <h2 className='text-white text-3xl font-bold'>
          {name.slice(0, 1).toUpperCase()}
        </h2>
      </div>

      <h2 className='text-gray-800 font-semibold text-lg'>Hi, {name}</h2>
      <nav>
        <ul className='flex flex-col gap-2 mx-2'>{linksList(name, setName)}</ul>
      </nav>
    </div>
  );
}

export default Menu;
