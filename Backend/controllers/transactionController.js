const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

// Transfer money between user transaction accounts
exports.transferMoney = async (req, res) => {
    let { toAccNo, toBsb, amount, description, name } = req.body;

    toAccNo = Number(toAccNo);
    toBsb = Number(toBsb);
    amount = Number(amount)

    try {
        const sender = await User.findById(req.userId);
        const receiver = await User.findOne({ 'AccNoBsb.accNo': toAccNo,  'AccNoBsb.bsb': toBsb});

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Payment Failed: Account with this bsb and account number does not exist' });
        }
        if (sender.transactionAcc.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        if ((sender.AccNoBsb.bsb === receiver.AccNoBsb.bsb) && (sender.AccNoBsb.accNo === receiver.AccNoBsb.accNo)) {
            return res.status(404).json({ message: 'Receiver cannot be yourself' });
        }

        // Perform the transfer
        sender.transactionAcc.balance -= amount;
        receiver.transactionAcc.balance += amount;

        // Record the transaction
        const transactionDate = new Date();
        sender.transactionAcc.transactions.push({
            amount: -amount,
            date: transactionDate,
            log: `Transfer to ${receiver.name}`,
            description: description

        });
        receiver.transactionAcc.transactions.push({
            amount,
            date: transactionDate,
            log: `Transfer from ${sender.name}` ,
            description: description

        });

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Payment Successfully Sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.transferByPayId = async (req, res) => {
    let { toPhoneNo , amount, description } = req.body

    toPhoneNo = Number(toPhoneNo);
    amount = Number(amount);
    

    try {
        const sender = await User.findById(req.userId);
        const receiver = await User.findOne({ 'phoneNo': toPhoneNo });

        if (!sender) {
            return res.status(404).json({ message: 'Sender account not found' });
        }
        if (!receiver){
            return res.status(404).json({ message: `Payment Failed: Account with phone number ${toPhoneNo} does not exist` });
        }
        if (receiver.phoneNo === sender.phoneNo){
            return res.status(404).json({ message: 'Receiver cannot be yourself' });
        }
        if (sender.transactionAcc.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Perform the transfer
        sender.transactionAcc.balance -= amount;
        receiver.transactionAcc.balance += amount;

        // Record the transaction
        const transactionDate = new Date();
        sender.transactionAcc.transactions.push({
            amount: -amount,
            date: transactionDate,
            log: `Transfer to ${receiver.name} with PayID with phone number ${receiver.phoneNo}`,
            description: description

        });
        receiver.transactionAcc.transactions.push({
            amount,
            date: transactionDate,
            log: `Transfer from ${sender.name} with PayID with phone number ${sender.phoneNo}` ,
            description: description

        });

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Payment Successfully Sent' });
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.transferWithinUser = async(req, res) => {
    let { fromAccountType, toAccountType, amount, description } = req.body;
    
    amount = Number(amount);
    
    try {
        // Find the user by username
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Ensure the account types are either 'transaction' or 'savings'
        if (fromAccountType === toAccountType) {
            return res.status(400).json({ message: 'Invalid account type' });
        }
        // Check if transferring from transaction to savings
        if (fromAccountType === 'transaction' && user.transactionAcc.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance in transaction account' });
        }
        if (fromAccountType === 'savings' && user.savingsAcc.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance in savings account' });
        }

        // Perform the transfer
        if (fromAccountType === 'transaction') {
            user.transactionAcc.balance -= amount;
            user.savingsAcc.balance += amount;
        } else {
            user.savingsAcc.balance -= amount;
            user.transactionAcc.balance += amount;
        }

        // Record the transaction in the respective account's transaction history
        const transactionDate = new Date();
        const logMessage = `Transfer from ${fromAccountType} to ${toAccountType}`;
        if (fromAccountType === 'transaction') {
            user.transactionAcc.transactions.push({
                amount: -amount,
                date: transactionDate,
                log: logMessage,
                description: description || 'Transfer to savings account'
            });
            user.savingsAcc.transactions.push({
                amount: amount,
                date: transactionDate,
                log: logMessage,
                description: description || 'Transfer from transaction account'
            });
        } else {
            user.savingsAcc.transactions.push({
                amount: -amount,
                date: transactionDate,
                log: logMessage,
                description: description || 'Transfer to transaction account'
            });
            user.transactionAcc.transactions.push({
                amount: amount,
                date: transactionDate,
                log: logMessage,
                description: description || 'Transfer from savings account'
            });
        }

        await user.save();
        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// update user email
exports.updateUserProfile = async (req, res) => {
    let { username, email } = req.body;
    email = String(email);

    try {
        // Find the user by username
        const user = await User.findOne({ 'login.username': username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email;
        
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// forgot password
exports.forgotPassword = async (req, res) => {
    let { username, token } = req.body;
    email = String(email);

    try {
        // Find the user by username
        const user = await User.findOne({ 'login.username': username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        token = generateToken();
        sendtoken(token);
      
        res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
