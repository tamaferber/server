// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // GET כל המשתמשים
// router.get('/', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // POST הוספת משתמש
// router.post('/', async (req, res) => {
//   const newUser = new User(req.body);
//   await newUser.save();
//   res.json(newUser);
// });

// // PUT עדכון משתמש
// router.put('/:id', async (req, res) => {
//   const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // DELETE מחיקת משתמש
// router.delete('/:id', async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.sendStatus(204);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET – כל המשתמשים
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Failed to fetch users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST – הוספת משתמש
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error("❌ Failed to save user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// PUT – עדכון משתמש
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("❌ Failed to update user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE – מחיקת משתמש
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("❌ Failed to delete user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
