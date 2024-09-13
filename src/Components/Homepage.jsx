import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage">
        <header className="homepage-header">
            <Link to="/login"><button className="login-button">Login</button></Link>
        </header>
        <div className="homepage-container">
            <h1>Learn the way you money online!</h1>
            <p>For those who want to learn how to perform online banking. Sign up in minutes!</p>
            <Link to="/signup"><button className='signup-button'>Sign Up</button></Link>
        </div>
    </div>
  );
};
