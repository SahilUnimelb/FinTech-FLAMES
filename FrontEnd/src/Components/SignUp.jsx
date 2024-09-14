import React from 'react';
import { Link } from 'react-router-dom';
export default function SignUp() {
  return (
    <div className='signup'>
      <div className='signup-container'>
        <h1>Sign Up</h1>
        <div className='signup-fields'>
          <input type="text" placeholder='Name' />
          <input type="text" placeholder='Username' />
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <div className='signup-agree'>
          <p>By clicking on Continue you automatically agree to the terms and conditions</p>
        </div>
        <button>Continue</button>
        <p className="signup-login">Already have an account? <span><Link to = "/login" className='signup-login-link'>Login</Link></span></p>
      </div>
    </div>
  );
}