const express = require('express');
const { createAccount, login, getUserAccount, transferMoney, transferByPayId, transferWithinUser} = require('../controllers/accountController');
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

// Transfer money PayId
router.post('/payIdTransfer', transferByPayId);

// Internal transfer
router.post('/transfer/within', authenticateToken,transferWithinUser);

module.exports = router;