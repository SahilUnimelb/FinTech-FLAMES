import React, {useState} from 'react';
import './Homepage.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
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
    <div className="homepage">
      <header className="homepage-header">
      </header>
      <div className="bottom-container">
        <div className="homepage-content">
          <h1>Your first steps to the world of online banking</h1>
          <p>For those who want to learn how to perform online banking. Sign up in minutes!</p>
          <Link to="/signup"><button className='signup-button'>Sign Up</button></Link>
        </div>
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='login-fields'>
              <p className="username">Username:</p>
              <input 
                type="text" 
                placeholder="Username" 
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
              <p className="password">Password:</p>
              <input 
                type="password" 
                placeholder="Password" 
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="remember-me">
                <p className="remember">Remember me:</p>
                <input type="checkbox" id="remember" />
              </div>
            </div>
            <button className="login-button">Continue</button>
          </form>
          
          
          <div className="forgot-pass-container">
            <p classname="forgot-password">Forgot password? <span><Link to = "/forgot-password" className='homepage-forgot-link'>Click here.</Link></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
