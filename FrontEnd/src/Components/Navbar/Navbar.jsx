import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import logoff from '../../Assets/logoff-icon.png';
import navToggle from '../../Assets/navbar-toggle.png';
import './Navbar.css';

export default function Navbar() {
  const [page, setPage] = useState(localStorage.getItem('activePage') || 'home');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const section = useRef();

  const onClickPage = (currPage) => {
    setPage(currPage);
    localStorage.setItem('activePage', currPage);
  };

  useEffect(() => {
    const storedPage = localStorage.getItem('activePage');
    if (storedPage) {
      setPage(storedPage);
    }

    // Check if the user has admin properties
    const adminStatus = JSON.parse(localStorage.getItem('isAdmin')) || false;
    setIsAdmin(adminStatus);
  }, []);

  const setHrTag = (currPage) => {
    if (page === currPage) {
        return <hr/>;
    }
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  const dropdown = (e) => {
    section.current.classList.toggle('navbar-section-visible');
    e.target.classList.toggle('open');
  }

  const toggleAdmin = () => {
    const newAdminStatus = !isAdmin;
    setIsAdmin(newAdminStatus);
    localStorage.setItem('isAdmin', newAdminStatus);
  }

  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            <img src={logo} alt="" />
            <p className='navbar-bank-title'>Learn to Bank</p>
            <p className='navbar-bank-slogan'>Where Money Pretends To Grow!</p>
        </div>
        <img className='navbar-dropdown' onClick={dropdown} src={navToggle} alt=''/>
        <ul ref={section} className='navbar-section'>
            <li onClick={() => onClickPage('home')}> <Link to="/home" className='navbar-link'>Home</Link>{setHrTag("home")}</li>
            <li onClick={() => onClickPage('view')}> <Link to="/view" className='navbar-link'>View Accounts</Link>{setHrTag("view")}</li>
            <li onClick={() => onClickPage('contacts')}> <Link to="/contacts" className='navbar-link'>Contacts</Link>{setHrTag("contacts")}</li>
            <li onClick={() => onClickPage('transfer')}> <Link to="/transfer" className='navbar-link'>Transfer</Link>{setHrTag("transfer")}</li>
            <li onClick={() => onClickPage('settings')}> <Link to="/settings" className='navbar-link'>Settings</Link>{setHrTag("settings")}</li>
            {isAdmin && <li onClick={() => onClickPage('adminpanel')}> <Link to="/adminpanel" className='navbar-link'>Admin Panel</Link>{setHrTag("adminpanel")}</li>}
        </ul>
        <div className='navbar-logoff'>
            <button onClick={handleLogout}>
                <img src={logoff} alt=""/>
                Log off
            </button>
        </div>
        <div className='admin-toggle'>
            <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={toggleAdmin}
                />
                Enable Admin Mode
            </label>
        </div>
    </div>
  )
}
