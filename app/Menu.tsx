'use client';
import { useUserStore } from '@/store/UserStore';
import { linksList } from '@/lib/LinkList';
import { use, useEffect, useState } from 'react';

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
      console.log('Session:', localStorage.getItem('session'));
      const session = localStorage.getItem('session');
      if (session) {
        console.log('try to login by session');
        try {
          const user: any = await loginUserBySession(session);
          console.log('login by session');
          user && setName(user.providerUid);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  useEffect(() => {
    check();
    setLoading(true);
  }, [loading]);

  return (
    <div className='hidden md:flex flex-col gap-4 w-48 p-4 bg-gray-500 min-h-full'>
      <div className='flex justify-center items-center bg-blue-500 rounded-full w-16 h-16 '>
        <h2 className='text-white text-3xl font-bold'>
          {name.slice(0, 1).toUpperCase()}
        </h2>
      </div>

      <h2 className='text-gray-200 font-semibold text-lg'>
        Hi, {name.slice(0, 12)}...
      </h2>
      <nav>
        <ul className='flex flex-col gap-2 w-full'>
          {linksList(name, setName, setIsOpen, logOut)}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
