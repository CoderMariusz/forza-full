import {
  ArrowLeftStartOnRectangleIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  CogIcon,
  CurrencyPoundIcon,
  FolderPlusIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const LinksList = (
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
    'production',
    'storesHc',
    'chillHc',
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
  const storesLr = ['dashboard', 'storesLr', 'orderHcToLr', 'settings'];

  const route = useRouter();

  const logoutFun = async () => {
    await logout();
    setName('');
    if (name !== '') {
      route.push('/login');
    }
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
  if (name === 'storeslr@forzafoods.com') links = storesLr;
  if (name === 'production@forzafoods.com') links = linksProduction;

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
            className='text-cyan-200 hover:text-gray-700 hover:font-bold p-2 rounded flex'>
            {link === 'dashboard' ? (
              <HomeIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'production' ? (
              <CogIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'storesHc' ? (
              <CircleStackIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'storesLr' ? (
              <CircleStackIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'orderHcToLr' ? (
              <FolderPlusIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'products' ? (
              <CurrencyPoundIcon className='h-6 w-6 max-w-[24px] text-gray-200 mr-2' />
            ) : null}
            {link === 'settings' ? (
              <Cog6ToothIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link === 'chillHc' ? (
              <SparklesIcon className='h-6 w-6 text-gray-200 mr-2' />
            ) : null}
            {link && link === 'orderHcToLr'
              ? 'ORDER HC-LR'
              : link.toUpperCase()}
          </Link>
        </li>
      ))}
      {name && (
        <li className='transition-all duration-200 hover:bg-blue-300 rounded p-2'>
          <button
            className='text-gray-200 hover:font-bold hover:text-gray-600 p-2 flex rounded w-full h-full'
            onClick={logoutFun}>
            <ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-gray-200  mr-2' />
            Logout
          </button>
        </li>
      )}
    </>
  );
};
