import React from 'react';
import './Homepage.css'
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage">
      <header className="homepage-header">
      </header>
      <div className="bottom-container">
        <div className="homepage-content">
          <h1>Your first steps to the world of online banking</h1>
          <p>For those who want to learn how to perform online banking. Sign up in minutes!</p>
          <Link to="/signup"><button className='signup-button'>Sign Up</button></Link>
        </div>
        <div className="login">
          <h1>Login</h1>
          <div className='login-fields'>
            <p className="username">Username:</p>
            <input type="text" placeholder="Username" />
            <p className="password">Password:</p>
            <input type="password" placeholder="Password" />
            <div className="remember-me">
              <p className="remember">Remember me:</p>
              <input type="checkbox" id="remember" />
            </div>
          </div>
          <button className="login-button">Continue</button>
          <div className="forgot-pass-container">
            <p classname="forgot-password">Forgot password? <span><Link to = "/forgot-password" className='homepage-forgot-link'>Click here.</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
