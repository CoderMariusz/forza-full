'use client';
import React, { useEffect } from 'react';
import { useUserStore } from '@/store/UserStore';
import TaskList from './TaskList';
import MessageList from './MessageList';

function DashboardPage() {
  const [name, setName, loginUserBySession, getAllUsers] = useUserStore(
    (state) => [
      state.name,
      state.setName,
      state.loginUserBySession,
      state.getAllUsers
    ]
  );
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
  const getAllUsersFromDB = async () => {
    const users = await getAllUsers();
    console.log(users);
  };

  useEffect(() => {
    check();
    getAllUsersFromDB();
  }, []);

  return (
    <div className='p-2'>
      <h1 className='text-3xl font-bold mb-2'>Dashboard</h1>
      <p>hi {name}, wish you have a nice Day</p>
      <h2 className='text-2xl font-bold text-gray-600'>Task for You:</h2>
      <hr
        className='my-1'
        style={{
          border: '1px solid #a2c0e9'
        }}
      />
      <TaskList />
      <h3 className='text-2xl font-bold text-gray-600'>Message: </h3>
      <hr
        className='my-2'
        style={{
          border: '1px solid #a2c0e9'
        }}
      />
      <MessageList />
    </div>
  );
}

export default DashboardPage;
