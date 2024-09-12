import React from 'react';
import './ResetPassword.css';
import logo from '../Assets/logo.png';

export default function ResetPassword() {
    return (
        <div className="reset">
            <div className="reset-container">
                <div className="logo">
                    <img src = {logo} alt = "" />
                </div>
                <h1>Reset your password</h1>
                <div className="email">
                    <p>Please enter your email address.</p>
                    <input type="email-address" placeholder='Enter your email address.'/>
                </div>
                <div className="reset-text">
                    <p>Please enter your new password.</p>
                </div>
                <div className="new-password">
                    <input type= "new-password" placeholder='Enter new password.'/>
                    <input type= "confirmation" placeholder='Confirm new password.'/>
                </div>
                <button>Confirm</button>
            </div>
        </div>
    )
}