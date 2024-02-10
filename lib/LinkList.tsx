'use client';
import {
  ArrowLeftStartOnRectangleIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  CurrencyPoundIcon,
  FolderPlusIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export const linksList = (
  name: string,
  setName: Function,
  setIsOpen: Function,
  logout: Function
) => {
  let links = ['dashboard', 'settings'];
  const linksStoreHc = ['dashboard', 'storesHc', 'orderHcToLr', 'settings'];
  const linksPlanning = [
    'dashboard',
    'products',
    'labels',
    'orders',
    'production',
    'stores',
    'storesHc',
    'chillHc',
    'settings'
  ];
  const linksProcess = ['dashboard', 'chillHc', 'settings'];
  const linksProduction = [
    'dashboard',
    'products',
    'labels',
    'orders',
    'production',
    'stores',
    'settings'
  ];
  const linksNpd = [
    <HomeIcon className='h-6 w-6 text-gray-500' /> + 'dashboard',
    'products',
    'labels',
    'webs',
    'rmMaterials',
    'settings'
  ];

  const logoutFun = async () => {
    await logout();
    setName('');
  };

  if (!name || name === '') {
    return (
      <li className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
        <Link
          href={`/login`}
          onClick={() => {
            setIsOpen(false);
          }}
          className='text-gray-200 hover:text-blue-500 hover:font-bold p-2 block rounded'>
          Login
        </Link>
      </li>
    );
  }
  if (name === 'storeshc@forzafoods.com') links = linksStoreHc;
  if (name === 'planning@forzafoods.com') links = linksPlanning;
  if (name === 'process@forzafoods.com') links = linksProcess;
  if (name === 'npd@forzafoods.com') links = linksNpd;

  return (
    <>
      {links.map((link) => (
        <li
          key={link}
          className='transition-all duration-300 hover:bg-blue-300 w-full p-1'>
          <Link
            href={`/${link}`}
            onClick={() => {
              console.log('clicked');
              setIsOpen(false);
            }}
            className='text-gray-200 hover:text-blue-800 hover:font-bold p-2 rounded flex'>
            {link === 'dashboard' ? (
              <HomeIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'storesHc' ? (
              <CircleStackIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'orderHcToLr' ? (
              <FolderPlusIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'products' ? (
              <CurrencyPoundIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'settings' ? (
              <Cog6ToothIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link && link === 'orderHcToLr'
              ? 'ORDER HC-LR'
              : link.toUpperCase()}
          </Link>
        </li>
      ))}
      {name && (
        <li className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
          <button
            className='text-gray-200 hover:bg-blue-800 hover:font-bold p-2 flex rounded w-full'
            onClick={logoutFun}>
            <ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-gray-200' />
            Logout
          </button>
        </li>
      )}
    </>
  );
};
