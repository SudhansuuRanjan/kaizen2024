import React from 'react'
import { createOAuthSession } from '../../services/auth.service';

const SignIn = () => {
  return (
    <div>
      <h1>Sign  In with Google</h1>
      <button onClick={() => createOAuthSession('google')}>Sign In with Google</button>
    </div>
  )
}

export default SignIn;