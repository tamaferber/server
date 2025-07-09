const mongoose = require('mongoose');

const fridgeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FridgeItem', fridgeItemSchema);
