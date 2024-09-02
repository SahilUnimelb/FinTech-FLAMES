// controllers/adminController.js

const User = require('../models/model');

// Delete an account
exports.deleteAccount = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOneAndDelete({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Modify transactions
exports.modifyTransactions = async (req, res) => {
    const { accountNumber, transactionId, amount, description } = req.body;

    try {
        const user = await User.findOne({ AccNoBsb: accountNumber });

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const transaction = user.transactions.id(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        transaction.amount = amount || transaction.amount;
        transaction.description = description || transaction.description;

        await user.save();

        res.status(200).json({ message: 'Transaction modified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
