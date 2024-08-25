const express = require('express');

const { createAccount, transferMoney } = require('../controllers/accountController');

const router = express.Router();

// Create a new account
router.post('/create', createAccount);

// Transfer money
router.post('/transfer', transferMoney);

module.exports = router;