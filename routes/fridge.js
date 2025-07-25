const express = require('express');
const router = express.Router();
const FridgeItem = require('../models/FridgeItem');



router.get('/', async (req, res) => {
  try {
    const items = await FridgeItem.find();
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Server error fetching items' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    // המרה של expconst parsedItems = items.map(item => {
  const parsedItems = items.map(item => {
  const expiration = new Date(item.expirationDate);
  const quantity = Number(item.quantity);

  return {
    name: item.name,
    quantity: isNaN(quantity) ? 1 : quantity,
    expirationDate: isNaN(expiration.getTime()) ? new Date() : expiration
  };
});


    //testing delete
    console.log("Parsed items to insert:", parsedItems);
    await FridgeItem.deleteMany({});
    await FridgeItem.insertMany(parsedItems);

    res.status(201).json({ message: 'Items saved to fridge' });
  } catch (err) {
    console.error('Error saving items:', err);
    res.status(500).json({ message: 'Server error saving items' });
  }
});


module.exports = router;
