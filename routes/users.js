const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET כל המשתמשים
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST הוספת משתמש
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// PUT עדכון משתמש
router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE מחיקת משתמש
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
