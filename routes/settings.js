const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// POST – שמירה
router.post('/', async (req, res) => {
  const { userId, ...settings } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

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
