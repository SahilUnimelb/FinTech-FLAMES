import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage">
      <header className="homepage-header">
        {/* <Link to="/"><button className="login-button">Login</button></Link> */}
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
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder='Username' />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='Password' />
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
          </div>
          <button className="login-button">Continue</button>
          <p classname="forgot-password">Forgot password? <span>Click here.</span></p>
        </div>
      </div>
    </div>
  );
};
