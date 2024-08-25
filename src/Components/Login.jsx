import React from 'react'

export default function Navbar() {
  return (
    <div className='login'>
        <div className='login-container'>
            <h1>Sign Up</h1>
            <div className='login-fields'></div>
                <input type = "text" placeholder='Name' />
                <input type = "email" placeholder='Email Address' />
                <input type = "password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="login-login">Already have an account? <span>Login here </span></p>
        <div className='login-agree'>
            <input type = "checkbox" name = " " id = " " />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
    </div>
  )
}
