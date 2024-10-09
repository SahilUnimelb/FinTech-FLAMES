import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({onClickDiv}) {
  const [accountData, setAccountData] = useState(() => {
    const storedData = localStorage.getItem('accountData');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [message, setMessage] = useState('');
  const flag = false;
  // Fetch user account details on component mount
  useEffect(() => {
    const fetchAccountDetails = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        setMessage('You are not logged in');
        return;
      }

      try {
        // Make a request to get the user account details
        const response = await axios.post('http://localhost:5000/api/accounts/getUser', {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        setAccountData(response.data); // Set the account data received from backend
        localStorage.setItem('accountData', JSON.stringify(response.data));
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message); // Display error message
        } else {
          setMessage('Failed to fetch account details. Please try again.');
        }
      }
    };

    fetchAccountDetails();
  }, []);
  const getDay = (date) => {
    const dayIndex = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
  };

  return (
    <div className="home">
      <div className='home-greeting'>
        <div className='home-greeting-message'>
          {flag && <p>{message}</p>}
          <p>Happy {getDay(new Date())} {accountData ? accountData.name : 'User'}</p>
        </div>
        <div className='home-greeting-empty'>
        </div>
        </div>
      <div className='home-box'>
        <div className='home-box-top'>
          <div className='home-box-left'>
            <h1>Savings home</h1>
            <p className='home-box-left-info-p'>BSB: {accountData ? accountData.bsb : ''}</p>
            <p className='home-box-left-info-p'>Account Number: {accountData ? accountData.accNo : ''}</p>
            <p className='home-box-left-view-p'>
            <Link to="/view" onClick={() => onClickDiv("Savings Account")}>View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
          <h2>Balance</h2>
          <p className='home-box-left-info-p'>{accountData ? "$" + accountData.savingAccDetails.balance : ''}</p>
          </div>
        </div>
        <div className='home-box-bottom'>
          <div className='home-box-left'>
          <h1>Transaction Account</h1>
          <p className='home-box-left-info-p'>BSB: {accountData ? accountData.bsb : ''}</p>
          <p className='home-box-left-info-p'>Account Number: {accountData ? accountData.accNo : ''}</p>
          <p className='home-box-left-view-p'>
            <Link to="/view" onClick={() => onClickDiv("Transactions Account")}>View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
            <h2>Balance</h2>
            <p className='home-box-left-info-p'>{accountData ? "$" + accountData.transAccDetails.balance : ''}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
