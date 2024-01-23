import React from 'react';

import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <main className='flex flex-col items-center mt-[5%] w-[60%]'>
      <h1 className='text-3xl font-bold'>Forza Login:</h1>
      <h5>please Login my your Email:</h5>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
