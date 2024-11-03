// forgot.jsx
import React, { useState } from 'react';
import axios from 'axios'; // For backend requests
import logo from '../../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './OneTimePin.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            const response = await axios.post('https://learn-to-bank-backend.onrender.com/forgetPassword', { email });
            alert('OTP sent to your email!');
            navigate('/otp'); // Redirect to OTP page
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div className="otp">
            <div className="otp-container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1>Forgot Password</h1>
                <div className="otp-text">
                    <h3>Please enter your email to receive a reset password PIN.</h3>
                </div>
                <div className="enter-otp">
                    <input
                        type="email"
                        placeholder="Enter your email here."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="resend-otp-container">
                    <button onClick={handleSendOTP}>Send OTP</button>
                    {error && <p className="error">{error}</p>}
                    <p className="resend-otp">
                        <span><Link to="/login">Back to login</Link></span>
                    </p>
                </div>
            </div>
        </div>
    );
}
