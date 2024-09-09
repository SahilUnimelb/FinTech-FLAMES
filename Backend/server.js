const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importing route handlers
const accountRoutes = require('./routes/accountRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const billRoutes = require('.routes/adminRoutes');
// const { ScheduleRecurringPayments } = require('.utils/scheduler');

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Logger middleware to track incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Route handlers
app.use('/api/accounts', accountRoutes);
// app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/bills', billRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a basic route
app.get('/', (req, res) => {
  res.send('Welcome to FinTech-FLAMES Learn to Bank API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
