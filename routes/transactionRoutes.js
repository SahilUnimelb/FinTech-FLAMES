const express = require('express');

const { getTransactions, schedulePayments } = require('../controllers/transactionController');

const router = express.Router();

// Get transactions
router.get('/:accountNumber', getTransactions);

// Schedule payments
router.post('/schedule', schedulePayments);

module.exports = router;