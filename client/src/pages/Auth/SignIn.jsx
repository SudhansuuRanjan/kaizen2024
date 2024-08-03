import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/profile');
    }
  }, [session, navigate]);

  return (
    <div className='flex w-full h-screen flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white'>
      <img src="/images/kaizen.png" alt="logo" className='h-20 mb-10' />
      <h1 className='lg:text-5xl text-4xl font-semibold stylysed'>Wander Through <span className='text-yellow-500'>Kaizen's</span></h1>
      <p className='lg:text-4xl text-3xl my-5 text-sky-500 font-semibold stylysed'>Enchated <span className='text-white'>Woods.</span></p>
      <button
        className='text-gray-700 px-6 rounded-full flex items-center py-2 bg-white lg:text-base text-sm font-semibold shadow-lg hover:bg-gray-100 transition-all duration-200 my-5 mt-20'
        onClick={() => signIn('google')}
      >
        <img src="google-logo.svg" alt="google" className='h-6 mr-4' />
        <p>Sign In with Google</p>
      </button>

      <button onClick={() => navigate("/")} className='text-yellow-500 font-medium text-sm underline'>
        Skip For Now
      </button>
    </div>
  );
}

export default SignIn;
