import React from 'react';
import logo from '../../../Assets/logo.png';
import './Reset.css';

export default function ResetPassword() {
    return (
        <div className="reset">
            <div className="reset-container">
                <div className="logo">
                    <img src = {logo} alt = "" />
                </div>
                <h1>Reset your password</h1>
                <div className="reset-text">
                    <h3>Please enter your new password.</h3>
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
