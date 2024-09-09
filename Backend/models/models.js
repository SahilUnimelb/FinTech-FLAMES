const mongoose = require('mongoose');
const speakeasy = require('speakeasy');
const rateLimit = require('express-rate-limit');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const User = require('./User');
const crypto = require('crypto'); // For generating secure tokens
const nodemailer = require('nodemailer'); // For sending emails

// set up express.json() middleware to parse JSON bodies
app.use(express.json());

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
  description: String
});



// Define the Login schema
const loginDetailSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true }
});



// Define the card details schema
const cardDetailSchema = new mongoose.Schema({
  number: {type: String, required: true, unique: true},
  cvv: {type: String, required: true},
  expiryMonth: {type: Number,required: true, default: Date().getMonth() + 1},
  expiryYear: {type: Number,required: true, default: (((Date().getFullYear())%100) + 5)}
});



// Define a schema for User
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: {type: Number, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  login: [loginDetailSchema], // Embedding login inside the user
  AccNoBsb: {type: Number, required: true, unique: true},
  Balance: {type: Number, required: true, default: 30000},
  lastLogedInAt: {type: Date, default: Date.now },
  cardDetails: [cardDetailSchema], // Embedding card inside the user
  roles: {type: String, required: true, default: "user"},
  transactions: [transactionSchema], // Embedding transactions inside the user
  is2FAEnabled: {type: Boolean, default: true},
  isDeleted: { type: Boolean, default: false }
});



// Create a model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;

const randomCardNumber = generateRandomCardNumber();
const randomCVV = generateRandomCVV(); // 3-digit CVV



async function updateLastLoggedIn(email) {
    const user = await User.findOne({email});
    if (!user) {
        console.log('User not found');
        return;
    }
  
    user.lastLoggedInAt = new Date(); // Set lastLoggedIn to now
    await user.save();
  
    console.log('User Last Logged In Updated:', user.lastLoggedInAt);
}



async function checkIfLoggedInLastTwoMonths(email) {
  const user = await User.findOne({email});
  if (!user) {
    console.log('User not found');
    return;
  }
  
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  if (user.lastLoggedInAt && user.lastLoggedInAt >= twoMonthsAgo) {
    console.log('User has logged in within the last two months.');
  } else {
    console.log('User has not logged in within the last two months.');
  }
}



// Function to change the role of a user from "user" to "admin"
async function changeUserRoleToAdmin(email) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      console.log('User not found');
      return;
    }

    // Check if the user is already an admin
    if (user.roles === 'admin') {
      console.log('User is already an admin.');
      return;
    }

    // Update the user's role to "admin"
    user.roles = 'admin';
    await user.save();

    console.log(`User role updated to admin for: ${user.email}`);
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}



// Soft delete function
async function softDeleteUser(email) {
  const user = await User.findOne({ email });
  if (user) {
    user.isDeleted = true;
    await user.save();
  }
}



// Function to generate a random 16-digit card number
function generateRandomCardNumber() {
  let cardNumber = '';
  
  for (let i = 0; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }

  return cardNumber;
}



// Function to generate a random CVV number (3 or 4 digits)
function generateRandomCVV(length = 3) {
  let cvv = '';

  for (let i = 0; i < length; i++) {
    cvv += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
  }

  return cvv;
}



// Generate a secret for 2FA
function generate2FA() {
  const secret = speakeasy.generateSecret({ length: 20 });
  return secret;
}



// Verify a 2FA token
function verify2FA(token, secret) {
  return speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: token,
  });
}



// setting max login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts. Please try again later.',
});



// Route for login
app.post('/login', loginLimiter, async (req, res) => {
  const { username, password, token } = req.body; // Assuming the client sends a token for 2FA

  try {
    // Step 1: Find the user by username
    const user = await User.findOne({ 'login.username': username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Check if the user is already deleted (if implementing soft delete)
    if (user.isDeleted) {
      return res.status(403).json({ message: 'User account is inactive or deleted.' });
    }

    // Step 3: Get the user's login details
    const loginDetails = user.login.find((login) => login.username === username);

    // Step 4: Verify the password
    const passwordMatches = await bcrypt.compare(password, loginDetails.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Step 5: If 2FA is enabled, verify the 2FA token
    const is2FAEnabled = user.is2FAEnabled; // Assume this field indicates if 2FA is enabled

    if (is2FAEnabled) {
      const secret = user.twoFASecret; // Assume you have stored the 2FA secret for the user
      const isTokenValid = verify2FA(token, secret); // Function to verify 2FA

      if (!isTokenValid) {
        return res.status(401).json({ message: 'Invalid 2FA token' });
      }
    }

    // Step 6: Check user roles and conditions (Optional)
    if (user.roles !== 'user' && user.roles !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Step 7: Update the last logged-in timestamp
    user.lastLoggedInAt = new Date();
    await user.save();

    // Step 8: Generate an authentication token (JWT, Session ID, etc.)
    // Assume you use JWT for session management (install jsonwebtoken library)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id, role: user.roles }, 'your_jwt_secret', { expiresIn: '1h' });

    // Step 9: Respond to the client with a success message and the JWT token
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// function for admin to be able to search for users
async function searchUsers(query) {
  const users = await User.find({ name: new RegExp(query, 'i') });
  return users;
}



// Fetch the user profile
app.get('/user/profile', async (req, res) => {
  try {
    // Assume the user is authenticated, and you have their user ID or email from the session or token
    const email = req.user.email; // Replace with your method of retrieving the user's identifier

    // Find the user by email
    const user = await User.findOne({ email }, '-login -cardDetails'); // Exclude sensitive information

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Update the user profile
app.put('/user/profile', async (req, res) => {
  try {
    const email = req.user.email; // Replace with your method of retrieving the user's identifier
    const { name, phoneNo, email: newEmail } = req.body; // Destructure the fields that can be updated

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the fields only if they are provided
    if (name) user.name = name;
    if (phoneNo) user.phoneNo = phoneNo;
    if (newEmail) user.email = newEmail;

    // Save the updated user profile
    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Function to handle forgot password request
async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a secure token
    const token = crypto.randomBytes(20).toString('hex');

    // Set token and expiration time (e.g., 1 hour from now)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save the user's reset token and expiration time
    await user.save();

    // Send the password reset email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.
      Please click on the following link, or paste it into your browser to complete the process within one hour of receiving this email:
      http://${req.headers.host}/reset/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'An email has been sent with further instructions.' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



// Function to handle password reset
async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find the user by the reset token and check if the token has expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token and expiration time
    user.login[0].password = hashedPassword; // Assuming only one login entry per user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error in resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
