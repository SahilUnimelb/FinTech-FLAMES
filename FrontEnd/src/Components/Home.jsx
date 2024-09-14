import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <div className='home-greeting'>
        <div className='home-greeting-message'>
          <p>Happy Friday Fischer</p>
        </div>
        <div className='home-greeting-empty'>
        </div>
        </div>
      <div className='home-box'>
        <div className='home-box-top'>
          <div className='home-box-left'>
            <h1>Savings home</h1>
            <p className='home-box-left-info-p'>BSB: 063123</p>
            <p className='home-box-left-info-p'>Account Number: 498559544</p>
            <p className='home-box-left-view-p'>
            <Link to="/savingaccount">View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
          <h2>Balance</h2>
          <p className='home-box-left-info-p'>$30,000</p>
          </div>
        </div>
        <div className='home-box-bottom'>
          <div className='home-box-left'>
          <h1>Transaction Account</h1>
          <p className='home-box-left-info-p'>BSB: 061738</p>
          <p className='home-box-left-info-p'>Account Number: 5827567287</p>
          <p className='home-box-left-view-p'>
            <Link to="/transactionaccount">View Account History</Link>
          </p>
          </div>
          <div className='home-box-right'>
            <h2>Balance</h2>
            <p className='home-box-left-info-p'>$30,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}
