import React from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Login</h1>
        <div className='login-fields'>
          <input type="text" placeholder='Username' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Login</button>
        <p className="login-signup">Don't have an account? <span><Link to = "/signup" className='login-signup-link'>Sign up</Link></span></p>
      </div>
    </div>
  );
}