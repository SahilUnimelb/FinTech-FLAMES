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
            login: {
                username,
                password: hashedPassword
            },
            AccNoBsb: {
                accNo,
                bsb
            },
            transactionAcc: {
                balance: initialDeposit
            },
            savingsAcc: {
                balance: 0
            },
            cardDetails: {
                number: cardNumber,
                cvv,
                expiryMonth,
                expiryYear
            },
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
        if (!user) {
            return res.status(400).json({ message: 'Invalid Username' });
        }
         // Check if user is deleted (soft delete)
        else if (user.isDeleted) {
            return res.status(403).json({ message: 'User account is inactive or deleted.' });
        }


        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.login.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        //console.error("Login server error: ", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Account Details
exports.getUserAccount = async (req, res) => {
    try{
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the relevant account information
        const accountData = {
            name: user.name,
            username: user.login.username,
            phoneNo: user.phoneNo,
            email: user.email,
            bsb: user.AccNoBsb.bsb,
            accNo: user.AccNoBsb.accNo,
            transAccDetails: {
                balance: user.transactionAcc.balance,
                transactions: user.transactionAcc.transactions
            },
            savingAccDetails: {
                balance: user.savingsAcc.balance,
                transactions: user.savingsAcc.transactions
            },
            cardDetails: user.cardDetails,
            role: user.roles
        };
        res.json(accountData);
    } catch(error) {
        // console.error("Error fetching user account details:", error);
        res.status(500).json({ message: 'Server error' });
    }


};

// Transfer money between user transaction accounts
exports.transferMoney = async (req, res) => {
    let { fromAccNo, fromBsb, toAccNo, toBsb, amount, description, name } = req.body;

    fromAccNo = Number(fromAccNo);  // Alternatively, parseInt(fromAccNo, 10);
    fromBsb = Number(fromBsb);
    toAccNo = Number(toAccNo);
    toBsb = Number(toBsb);
    amount = Number(amount)

    try {
        const sender = await User.findOne({ 'AccNoBsb.accNo': fromAccNo, 'AccNoBsb.bsb': fromBsb});
        const receiver = await User.findOne({ 'AccNoBsb.accNo': toAccNo,  'AccNoBsb.bsb': toBsb});

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'Account not found' });
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
            log: `Transfer to ${name}`,
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

        res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.transferByPayId = async (req, res) => {
    let { fromPhoneNo, toPhoneNo , amount, description } = req.body
    
    fromPhoneNo = Number(fromPhoneNo);
    toPhoneNo = Number(toPhoneNo);
    amount = Number(amount);
    

    try{
        const sender = await User.findOne({ 'phoneNo': fromPhoneNo });
        const receiver = await User.findOne({ 'phoneNo': toPhoneNo });

        if (!sender) {
            return res.status(404).json({ message: 'Sender account not found' });
        }
        if (!receiver){
            return res.status(404).json({ message: 'Receiver account not found' });
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

        res.status(200).json({ message: 'Transfer successful' });
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}