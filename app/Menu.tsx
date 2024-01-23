'use client';
import { useUserStore } from '@/store/UserStore';
import { linksList } from '@/lib/LinkList';
import { use, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

function Menu() {
  const [name, setName] = useUserStore((state) => [state.name, state.setName]);
  const [loading, setLoading] = useState(false);
  const [loginUserBySession] = useUserStore((state) => [
    state.loginUserBySession
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [logOut] = useUserStore((state) => [state.logOut]);

  async function check() {
    if (localStorage.getItem('session')) {
      const session = localStorage.getItem('session');
      if (session) {
        try {
          const user: any = await loginUserBySession(session);

          user && setName(user.providerUid);
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    }
  }
  useEffect(() => {
    check();
    setLoading(true);
  }, [loading]);

  return (
    <div className='hidden md:flex flex-col gap-4 w-48 p-2 bg-cyan-700 min-h-full'>
      <div className='flex justify-center items-center bg-yellow-500 ml-3 rounded-full w-16 h-16 '>
        <h2 className='text-white text-3xl font-bold'>
          {name.slice(0, 1).toUpperCase()}
        </h2>
      </div>

      <h2 className='text-gray-200 ml-3 font-semibold text-lg'>
        Hi, {name.slice(0, 12)}...
      </h2>
      <nav>
        <ul className='flex flex-col gap-y-2 w-full'>
          {linksList(name, setName, setIsOpen, logOut)}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
