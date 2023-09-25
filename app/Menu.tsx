'use client';
import { account, avatars } from '@/appwrite';
import { useUserStore } from '@/store/UserStore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Menu() {
  const [name, setName] = useUserStore((state) => [state.name, state.setName]);
  const links = [
    'dashboard',
    'products',
    'orders',
    'production',
    'stores',
    'settings'
  ];

  const logout = async () => {
    await account.deleteSession('current');
    try {
      setName('');
    } catch (e) {
      console.log(e);
    }
  };

  if (!name)
    return (
      <div className='flex flex-col gap-4 mx-4 mt-4 w-48 p-4 bg-gray-100 rounded-lg shadow-lg'>
        <h2 className='text-gray-800 font-semibold text-lg'>
          Hi, You need to be login
        </h2>
        <nav>
          <ul className='flex flex-col gap-2 mx-2'>
            <li
              key={'login'}
              className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
              <Link
                href={`/login`}
                className='text-gray-600 hover:text-blue-500 hover:font-bold p-2 block rounded'>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );

  return (
    <div className='flex flex-col gap-4 mx-4 mt-4 w-48 p-4 bg-gray-100 rounded-lg shadow-lg'>
      <div className='flex justify-center items-center bg-blue-500 rounded-full w-16 h-16 '>
        <h1 className='text-white text-3xl font-bold'>
          {name.slice(0, 1).toUpperCase()}
        </h1>
      </div>

      <h2 className='text-gray-800 font-semibold text-lg'>Hi, {name}</h2>
      <nav>
        <ul className='flex flex-col gap-2 mx-2'>
          {links.map((link) => (
            <li
              key={link}
              className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
              <Link
                href={`/${link}`}
                className='text-gray-600 hover:text-blue-500 hover:font-bold p-2 block rounded'>
                {link.slice(0, 1).toUpperCase() + link.slice(1)}
              </Link>
            </li>
          ))}
          {name && (
            <li className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
              <button
                className='text-gray-600 hover:text-blue-500 hover:font-bold p-2 block rounded'
                onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
