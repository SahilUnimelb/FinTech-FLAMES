import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    //phoneNo: '',
    //initialDeposit: ''
  })

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to your backend API
      const response = await axios.post('http://localhost:5000/api/accounts/create', formData);
      setMessage(response.data.message); // Success message from backend
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Error message from backend
      } else {
        setMessage(`An error occurred during signup`);
      }
    }


  }

  return (
    <div className='signup'>
      <div className='signup-container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='signup-fields'>
            <input 
              type="text" 
              placeholder='Name' 
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input 
              type="text" 
              placeholder='Username' 
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input 
              type="email" 
              placeholder='Email Address' 
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              type="password" 
              placeholder='Password' 
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='signup-agree'>
            <p>By clicking on Continue you automatically agree to the terms and conditions</p>
          </div>
          <button>Continue</button>
        </form>
        {message && <p>{message}</p>}
        <p className="signup-login">Already have an account? <span><Link to = "/login" className='signup-login-link'>Login</Link></span></p>
      </div>
    </div>
  );
}