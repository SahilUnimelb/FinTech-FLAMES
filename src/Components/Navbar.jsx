import React from 'react';
import logo from '../Assets/logo.jpeg';
import logoff from '../Assets/logoff-icon.png';
export default function Navbar() {
  return (
    // Div for the Navbar
    <div className='navbar'>
        <div className='navbar-logo'>
            <img src = {logo} alt = "" />
                <p className='navbar-bank-title'>Learn to Bank</p>
                <p className = 'navbar-bank-slogan'>Where Money Pretends To Grow!</p>
        </div>
        <ul className='navbar-section'>
            <li className='navbar-link'>Home</li>
            <li className='navbar-link'>View Accounts</li>
            <li className='navbar-link'>Business</li>
            <li className='navbar-link'>Transfer</li>
            <li className='navbar-link'>Settings</li>
        </ul>
        <div className='navbar-logoff'>

            <button>
                <img src = {logoff} alt = ""/>
                Log off
            </button>
        </div>
    </div>
  )
}
