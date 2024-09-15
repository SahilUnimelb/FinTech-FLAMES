// controllers/adminController.js

const { User } = require('../models/models');

// Delete an account
exports.deleteAccount = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ 'login.username': username });

        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // If its not soft deleted, set soft delete to true
        if (!user.isDeleted){
            user.isDeleted = true;
            await user.save();
            res.status(200).json({ message: `Account with user ${username} soft deleted successfully` });
        }
        // Otherwise actually delete user from database
        else {
            await user.deleteOne();
            res.status(200).json({ message: `Account with user ${username} deleted successfully` });
        }

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

exports.setUserBalance = async (req, res) => {
    const { accNumber, newBalance } = req.body;

    try{
        const receiver = await User.findOne({ 'AccNoBsb.accNo': accNumber });

        if (!receiver) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Set Balance
        amount = newBalance - receiver.Balance;
        receiver.Balance = newBalance;

        // Record transfer
        const transactionDate = new Date();
        receiver.transactions.push({ 
            amount, 
            description: `Transfer from Administrator` ,
            date: transactionDate
        });

        await receiver.save();
        res.status(200).json({ message: `Succesfully set user ${receiver.username} balance to ${newBalance}` });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};