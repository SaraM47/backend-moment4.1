/**
* This file defines the Mongoose schema and model for user accounts, including fields for username, hashed password, and account creation date.
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
