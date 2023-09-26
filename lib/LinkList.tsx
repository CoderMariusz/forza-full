'use client';
import { account } from '@/appwrite';
import { useUserStore } from '@/store/UserStore';
import Link from 'next/link';

export const linksList = (name: string, setName: Function) => {
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

  if (!name) {
    return (
      <li className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
        <Link
          href={`/login`}
          className='text-gray-600 hover:text-blue-500 hover:font-bold p-2 block rounded'>
          Login
        </Link>
      </li>
    );
  } else {
    return (
      <>
        {links.map((link) => (
          <li
            key={link}
            className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
            <Link
              href={`/${link}`}
              className='text-gray-600 hover:text-blue-500 hover:font-bold p-2 block rounded'>
              {link}
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
      </>
    );
  }
};
