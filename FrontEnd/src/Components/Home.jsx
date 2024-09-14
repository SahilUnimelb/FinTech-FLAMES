import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [accountData, setAccountData] = useState(null);
  const [message, setMessage] = useState('');

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

  return (
    <div className="home">
      <div className='home-greeting'>
        <div className='home-greeting-message'>
          <p>Happy Friday {accountData ? accountData.name : 'User'}</p>
        </div>
        <div className='home-greeting-empty'>
        </div>
        </div>
      <div className='home-box'>
        <div className='home-box-top'>
          <div className='home-box-left'>
            <h1>Savings home</h1>
            <p className='home-box-left-info-p'>BSB: {accountData ? accountData.bsb : 'cannot retrieve bsb'}</p>
            <p className='home-box-left-info-p'>Account Number: {accountData ? accountData.accNo : 'cannot retrieve account number'}</p>
            <p className='home-box-left-view-p'>
            <Link to="/savingaccount">View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
          <h2>Balance</h2>
          <p className='home-box-left-info-p'>{accountData ? "$" + accountData.transAccDetails.balance : 'Null Balance'}</p>
          </div>
        </div>
        <div className='home-box-bottom'>
          <div className='home-box-left'>
          <h1>Transaction Account</h1>
          <p className='home-box-left-info-p'>BSB: {accountData ? accountData.bsb : 'cannot retrieve bsb'}</p>
          <p className='home-box-left-info-p'>Account Number: {accountData ? accountData.accNo : 'cannot retrieve account number'}</p>
          <p className='home-box-left-view-p'>
            <Link to="/transactionaccount">View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
            <h2>Balance</h2>
            <p className='home-box-left-info-p'>{accountData ? "$" + accountData.savingAccDetails.balance : 'Null Balance'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
