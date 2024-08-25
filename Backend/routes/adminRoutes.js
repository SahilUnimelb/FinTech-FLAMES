const express = require('express');

const { deleteAccount, modifyTransactions } = require('../controllers/adminController');

const router = express.Router();

// Delete an account
router.post('/delete', deleteAccount);

// Modify transactions
router.post('/modify', modifyTransactions);

module.exports = router;