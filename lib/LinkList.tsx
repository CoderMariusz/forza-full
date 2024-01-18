'use client';
import Link from 'next/link';

export const linksList = (
  name: string,
  setName: Function,
  setIsOpen: Function,
  logout: Function
) => {
  let links = ['dashboard', 'settings'];
  const linksStoreHc = ['dashboard', 'storesHc', 'settings'];
  const linksPlanning = [
    'dashboard',
    'products',
    'labels',
    'orders',
    'production',
    'stores',
    'storesHc',
    'ChillHc',
    'settings'
  ];
  const linksChillHc = [
    'dashboard',
    'products',
    'labels',
    'orders',
    'production',
    'stores',
    'settings'
  ];
  const linksProduction = [
    'dashboard',
    'products',
    'labels',
    'orders',
    'production',
    'stores',
    'settings'
  ];

  console.log('linksList', name);

  const logoutFun = async () => {
    await logout();
    setName('');
    console.log('logout');
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

  return (
    <>
      {links.map((link) => (
        <li
          key={link}
          className='transition-all duration-200 hover:bg-blue-300 w-full p-1'>
          <Link
            href={`/${link}`}
            onClick={() => {
              console.log('clicked');
              setIsOpen(false);
            }}
            className='text-gray-200 hover:text-blue-800 hover:font-bold p-2 block rounded'>
            {link}
          </Link>
        </li>
      ))}
      {name && (
        <li className='transition-all duration-200 hover:bg-blue-100 rounded p-1'>
          <button
            className='text-gray-200 hover:text-blue-800 hover:font-bold p-2 block rounded'
            onClick={logoutFun}>
            Logout
          </button>
        </li>
      )}
    </>
  );
};
