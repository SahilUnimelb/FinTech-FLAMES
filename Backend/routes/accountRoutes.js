const express = require('express');
const { createAccount, login, getUserAccount, addContact, getBankContacts, getPayIdContacts } = require('../controllers/accountController');
const { authenticateToken } = require('../middleWare/auth')

const router = express.Router();

// Create a new account
router.post('/create', createAccount);

// Login
router.post('/login', login);

// Get User
router.post('/getUser', authenticateToken, getUserAccount);

// Add Contact
router.post('/addContact', authenticateToken, addContact);

// Get Bank Contacts
router.post('/getBankContacts', authenticateToken, getBankContacts);

// Get PayId Contacts
router.post('/getPayIdContacts', authenticateToken, getPayIdContacts);

module.exports = router;