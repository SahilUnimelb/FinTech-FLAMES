import React from 'react';
import logo from '../../../Assets/logo.png';
import { Link } from 'react-router-dom';
import './OneTimePin.css';

export default function OneTimePin() {
    return (
        <div className="otp">
            <div className="otp-container">
                <div className="logo">
                    <img src = {logo} alt = "" />
                </div>
                <h1>Reset Password PIN</h1>
                <div className="otp-text">
                    <h3>Please enter the One Time PIN that was sent to your email below to reset your password.</h3>
                </div>
                <div className="enter-otp">
                    <input type= "input-otp" placeholder='Enter OTP here.'/>
                </div>
                <div className="resend-otp-container">
                    <button>Confirm</button>
                    <p className="resend-otp">Did not receive email? <span><Link>Click here.</Link></span></p>
                </div>
                
            </div>
        </div>
    )
}