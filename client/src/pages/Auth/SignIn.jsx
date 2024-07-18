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
    <div className='flex w-full h-screen flex-col justify-center items-center gap-4 bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white'>
      <h1 className='text-3xl font-bold mb-6'>Sign In with Google</h1>
      <button
        className='text-gray-700 px-6 py-2 rounded-md bg-white font-medium shadow-lg hover:bg-gray-100 transition-all duration-200'
        onClick={() => signIn('google')}
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default SignIn;
