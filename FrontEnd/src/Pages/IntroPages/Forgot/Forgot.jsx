import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/logo.png';
import './Forgot.css';

export default function ForgotPassword() {
    return(
        <div className="forgot">
            <div className="forgot-container">
                <div className="logo">
                    <img src = {logo} alt = "" />
                </div>
                <h1>Forgotten your password?</h1>
                <div className="forgot-text">
                    <p>Please enter below the email address associated with your account,
                        and we will send you a link to reset your password.</p>
                </div>
                <div className="email-address">
                    <input type= "email-address" placeholder='Email  Address'/>
                </div>
                <button>Confirm</button>
                <p>Don't have an account? <span><Link to = "/signup" className='forgot-signup-link'>Click here.</Link></span></p>
            </div>
        </div>
    )
}