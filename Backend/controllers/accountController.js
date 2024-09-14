// controllers/accountController.js
const { User, generateRandomCardNumber, generateRandomCVV, generateAccNo, generateBsb, generatePhoneNo } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Account Registration / Creation
exports.createAccount = async (req, res) => {
    const { name, email, username, password} = req.body;

    try {
        // Check if username is already taken
        const existingUser = await User.findOne({ 'login.username': username });
        // Check if email is already in use
        const existingEmail = await User.findOne({ email });

        if(existingUser && existingEmail) {
            return res.status(400).json({ message: 'Username and email are already registered to an account' });
        }
        else if (existingUser) {
            return res.status(400).json({ message: 'Username has been taken' });
        }
        else if (existingEmail) {
            return res.status(400).json({ message: 'This email already has an registered account, please login instead' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate random unique Account Number and BSB
        const accNo = await generateAccNo();
        const bsb = await generateBsb();

        // Card Details
        const cardNumber = generateRandomCardNumber();
        const cvv = generateRandomCVV();
        const expiryMonth = new Date().getMonth() + 1;
        const expiryYear = new Date().getFullYear() + 5;

        // Deposit
        const initialDeposit = 30000;

        // Phone Number
        const phoneNo = await generatePhoneNo();

        // Create new user
        const newUser = new User({
            name,
            phoneNo,
            email,
            login: [{
                username,
                password: hashedPassword
            }],
            AccNoBsb: [{
                accNo,
                bsb
            }],
            Balance: initialDeposit,
            cardDetails: [{
                number: cardNumber,
                cvv,
                expiryMonth,
                expiryYear
            }],
            roles: 'user',
            lastLogedInAt: new Date(),
            is2FAEnabled: true,
            isDeleted: false
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'Server error - Create Account' });
    }
};

// Account Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by login schema username
        const user = await User.findOne({ 'login.username': username });

         // Check if user is deleted (soft delete)
         if (user.isDeleted) {
            return res.status(403).json({ message: 'User account is inactive or deleted.' });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Account Details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Transfer money between accounts
exports.transferMoney = async (req, res) => {
    const { fromAccNo, fromBsb, toAccNo, toBsb, amount } = req.body;

    try {
        const sender = await User.findOne({ 'AccNoBsb.accNo': fromAccNo, 'AccNoBsb.bsb': fromBsb});
        const receiver = await User.findOne({ 'AccNoBsb.accNo': toAccNo,  'AccNoBsb.bsb': toBsb});

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (sender.Balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Perform the transfer
        sender.Balance -= amount;
        receiver.Balance += amount;

        // Record the transaction
        const transactionDate = new Date();
        sender.transactions.push({ 
            amount: -amount, 
            description: `Transfer to ${receiver.name}`,
            date: transactionDate 
        });
        receiver.transactions.push({ 
            amount, 
            description: `Transfer from ${sender.name}` ,
            date: transactionDate
        });

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
