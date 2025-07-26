const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
  const { email } = req.query;

  try {
    if (email) {
      // שליפה לפי אימייל
      const existing = await User.find({ email });
      return res.json(existing);
    } else {
      // שליפה של כל המשתמשים
      const allUsers = await User.find({});
      return res.json(allUsers);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});



// POST – הוספת משתמש
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(" Failed to save user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// PUT – עדכון משתמש
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(" Failed to update user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE – מחיקת משתמש
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(" Failed to delete user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// בדיקת התחברות של אדמין
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ isAdmin: true });
  } else {
    return res.status(401).json({ isAdmin: false, message: "Invalid credentials" });
  }
});


module.exports = router;
