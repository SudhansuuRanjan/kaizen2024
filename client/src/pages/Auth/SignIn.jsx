import React from 'react'
import { createOAuthSession } from '../../services/auth.service';

const SignIn = () => {
  return (
    <div className='flex w-full h-screen flex-col justify-center items-center gap-4'>
      <h1 className='text-lg font-semibold'>Sign  In with Google</h1>
      <button className='text-gray-700 px-6 py-1 rounded-md bg-white font-medium' onClick={() => createOAuthSession('google')}>Sign In with Google</button>
    </div>
  )
}

export default SignIn;