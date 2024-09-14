const express = require('express');

const { deleteAccount, setUserBalance } = require('../controllers/adminController');

const router = express.Router();

// Delete an account
router.post('/delete', deleteAccount);

// Set Balance of a User
router.post('/setBalance', setUserBalance);

module.exports = router;