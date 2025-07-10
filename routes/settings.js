
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: String,
  language: String,
  theme: String,
  coin: String,
  notifications: String,
  sound: String
});

module.exports = mongoose.model('Settings', settingsSchema);

const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// POST – שמירה
router.post('/', async (req, res) => {
  const { userId, ...settings } = req.body;

  try {
    const updated = await Settings.findOneAndUpdate(
      { userId },
      { userId, ...settings },
      { upsert: true, new: true }
    );
    res.json({ message: 'Settings saved successfully', data: updated });
  } catch (err) {
    console.error('Error saving settings to MongoDB:', err);
    res.status(500).json({ message: 'Failed to save settings' });
  }
});

// GET – שליפה
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const settings = await Settings.findOne({ userId });
    if (!settings) return res.status(404).json({ message: 'Settings not found' });
    res.json(settings);
  } catch (err) {
    console.error('Error retrieving settings:', err);
    res.status(500).json({ message: 'Failed to load settings' });
  }
});

module.exports = router;
