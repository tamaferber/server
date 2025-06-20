const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const settingsFile = path.join(__dirname, '../data/settings.json');

// POST – שמירה
router.post('/', (req, res) => {
  const settings = req.body;
  fs.writeFile(settingsFile, JSON.stringify(settings, null, 2), (err) => {
    if (err) {
      console.error('Error saving settings:', err);
      return res.status(500).json({ message: 'Failed to save settings' });
    }
    console.log('Settings saved:', settings);
    res.json({ message: 'Settings saved successfully' });
  });
});

// GET – שליפה
router.get('/', (req, res) => {
  fs.readFile(settingsFile, (err, data) => {
    if (err) {
      console.error('Error reading settings:', err);
      return res.status(500).json({ message: 'Failed to read settings' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
