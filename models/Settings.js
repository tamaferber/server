const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: String,
  language: String,
  theme: String,
  coin: String,
  notifications: String,
  sound: String
});

module.exports = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
