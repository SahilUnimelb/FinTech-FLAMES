const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
    amount: Number,
    date: { type: Date, default: Date.now },
    description: String
  });

// Define a schema for User
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  AccNoBsb: {type: Int32Array, required: true, unique: true},
  Balance: {type: Number, required: true, default: 30000},
  lastLogedInAt: {type: Date, default: Date.now },
  cardDetails: {type: Int16Array, unique: true},
  roles: {type: String, required: true, default: "user"},
  transactions: [transactionSchema] // Embedding transactions inside the user
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
