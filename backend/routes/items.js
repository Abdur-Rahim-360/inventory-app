const express = require('express');
const router = express.Router();
const db = require('../models/db');

// ✅ Add new item with auto-generated customId
router.post('/', async (req, res) => {
  const { inventoryId, values } = req.body;

  if (!inventoryId || typeof inventoryId !== 'number' || !values || typeof values !== 'object') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [existing] = await db.execute(
      'SELECT COUNT(*) AS count FROM items WHERE inventory_id = ?',
      [inventoryId]
    );
    const count = existing[0].count + 1;
    const customId = `ITEM-${String(count).padStart(4, '0')}`;

    await db.execute(
      'INSERT INTO items (inventory_id, custom_id, values_json) VALUES (?, ?, ?)',
      [inventoryId, customId, JSON.stringify(values)]
    );

    res.json({ message: 'Item added successfully', customId });
  } catch (err) {
    console.error('Add item error:', err.message);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// 📦 Get items for a specific inventory
router.get('/:inventoryId', async (req, res) => {
  const { inventoryId } = req.params;

  try {
    const [items] = await db.execute(
      'SELECT * FROM items WHERE inventory_id = ? ORDER BY created_at DESC',
      [inventoryId]
    );
    res.json(items);
  } catch (err) {
    console.error('Fetch items error:', err.message);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;
