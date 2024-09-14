import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import logoff from '../Assets/logoff-icon.png';
export default function Navbar() {
  const [page, setPage] = useState('home');

  const onClickPage = (currPage) => {
    return setPage(currPage);
  }

  const setHrTag = (currPage) => {
    if (page === currPage) {
        return <hr/>;
    }
    return null;
  }
  return (
    // Div for the Navbar
    <div className='navbar'>
        <div className='navbar-logo'>
            <img src = {logo} alt = "" />
                <p className='navbar-bank-title'>Learn to Bank</p>
                <p className = 'navbar-bank-slogan'>Where Money Pretends To Grow!</p>
        </div>
        <ul className='navbar-section'>
            <li onClick={() => onClickPage('home')}> <Link to = "/home" className='navbar-link'>Home </Link>{setHrTag("home")}</li>
            <li onClick={() => onClickPage('view')}> <Link to = "/view" className='navbar-link'>View Accounts </Link>{setHrTag("view")}</li>
            <li onClick={() => onClickPage('business')}> <Link to = "/business" className='navbar-link'>Business </Link>{setHrTag("business")}</li>
            <li onClick={() => onClickPage('transfer')}> <Link to = "/transfer" className='navbar-link'>Transfer </Link>{setHrTag("transfer")}</li>
            <li onClick={() => onClickPage('settings')}> <Link to = "/settings" className='navbar-link'>Settings </Link>{setHrTag("settings")}</li>
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
