'use client';
import { database } from '@/appwrite';
import { useProductsStore } from '@/store/ProductsStore';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/UserStore';

function DashboardPage() {
  const [name, setName, loginUserBySession] = useUserStore((state) => [
    state.name,
    state.setName,
    state.loginUserBySession
  ]);
  const check = async () => {
    if (localStorage.getItem('session')) {
      console.log('Session:', localStorage.getItem('session'));
      const session = localStorage.getItem('session');
      if (session) {
        try {
          const user: any = await loginUserBySession(session);
          console.log(user);
          setName(user.providerUid);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>here will be visible all your task and messages</p>
      <p>{name}</p>
    </div>
  );
}

export default DashboardPage;
