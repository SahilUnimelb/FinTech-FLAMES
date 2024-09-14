import React, { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend for login
      const response = await axios.post('http://localhost:5000/api/accounts/login', formData);
      const { token, message } = response.data;
      setMessage(message);

      // If login is successful, store the token and redirect to a different page
      if (token) {
        localStorage.setItem('authToken', token); // Store the token in localStorage
        navigate('/home'); // Redirect to the home page
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Show error message from the backend
      } else {
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-fields'>
            <input 
              type="text" 
              placeholder='Username' 
              name='username'
              value={formData.username}
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
            <button>Login</button>
          </div>
        </form>
        {message && <p>{message}</p>}
        <p className="login-signup">Don't have an account? <span><Link to = "/signup" className='login-signup-link'>Sign up</Link></span></p>
      </div>
    </div>
  );
}