'use client';
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
    'dashboard',
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
            className='text-gray-200 hover:text-blue-800 hover:font-bold p-2 block rounded'>
            {link && link === 'orderHcToLr'
              ? 'ORDER HC-LR'
              : link.toUpperCase()}
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
