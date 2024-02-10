'use client';

import { redirect } from 'next/navigation';
import { useUserStore } from '@/store/UserStore';
import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    name,
    userEmail,
    id,
    setName,
    setUserEmail,
    setId,
    loginUser,
    loginUserBySession
  ] = useUserStore((state) => [
    state.name,
    state.email,
    state.id,
    state.setName,
    state.setEmail,
    state.setId,
    state.loginUser,
    state.loginUserBySession
  ]);
  const loginFunction = async (email: string, password: string) => {
    try {
      const userWithName = await loginUser(email, password);
      if (userWithName !== undefined) {
        console.log(localStorage.getItem('session'));
      }

      return userWithName;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    loginFunction(email, password);
    setName(email.toLocaleLowerCase());
    setEmail(email.toLocaleLowerCase());
  };

  name && redirect('/dashboard');

  return (
    <form
      onSubmit={handleLogin}
      className='bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10 min-w-[330px]'>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-600'>
          Email:{' '}
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Enter your email address'
          className='mt-1 p-2 w-full border rounded-md text-slate-700'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-600'>
          Password:{' '}
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Enter your password'
          className='mt-1 p-2 w-full border rounded-md text-slate-700'
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
