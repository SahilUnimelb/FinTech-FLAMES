const express = require('express');
const { createAccount, login, getUserAccount, transferMoney } = require('../controllers/accountController');
const { authenticateToken } = require('../middleWare/auth')

const router = express.Router();

// Create a new account
router.post('/create', createAccount);

// Login
router.post('/login', login);

// Get User
router.post('/getUser', authenticateToken, getUserAccount);

// Transfer money
router.post('/transfer', transferMoney);

module.exports = router;