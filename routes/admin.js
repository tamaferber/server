const express = require('express');
const router = express.Router();
require('dotenv').config();

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ isAdmin: true });
  } else {
    return res.status(401).json({ isAdmin: false, message: "Invalid credentials" });
  }
});

module.exports = router;
