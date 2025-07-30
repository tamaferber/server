const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// POST – שמירת עגלה
router.post('/', async (req, res) => {
  const cartItems = req.body;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ message: 'Cart must be an array of items' });
  }

  try {
    // מחיקת עגלה ישנה של המשתמש
    if (cartItems.length > 0) {
      await CartItem.deleteMany({ email: cartItems[0].email });
    }

    // שמירה חדשה
    const savedItems = await CartItem.insertMany(cartItems);
    res.status(201).json({ message: 'Cart saved successfully', data: savedItems });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ message: 'Failed to save cart' });
  }
});

// // GET – שליפת עגלה לפי מייל
// router.get('/:email', async (req, res) => {
//   const { email } = req.params;

//   try {
//     const userCart = await CartItem.find({ email });
//     res.json(userCart);
//   } catch (err) {
//     console.error('Error fetching cart:', err);
//     res.status(500).json({ message: 'Failed to fetch cart' });
//   }
// });

// GET – שליפת עגלה לפי מייל (מפרמטר query)
router.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const userCart = await CartItem.find({ email });
    res.json(userCart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// DELETE – הסרת מוצר מסוים מהעגלה לפי שם ומייל
router.delete('/', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Email and item name are required' });
  }

  try {
    const deleted = await CartItem.deleteOne({ email, name });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.json({ message: 'Item deleted from cart' });
  } catch (err) {
    console.error('Error deleting item from cart:', err);
    res.status(500).json({ message: 'Failed to delete item' });
  }
});



module.exports = router;
