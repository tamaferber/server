const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  status: { type: String, enum: ['blocked', 'unblocked'], default: 'unblocked' }
});

module.exports = mongoose.model('User', userSchema);
