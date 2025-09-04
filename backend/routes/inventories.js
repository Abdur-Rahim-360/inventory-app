const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Create inventory
router.post('/', async (req, res) => {
  const { title, description, fields } = req.body;
  const [result] = await db.execute(
    'INSERT INTO inventories (title, description) VALUES (?, ?)',
    [title, description]
  );
  const inventoryId = result.insertId;
  for (const field of fields) {
    await db.execute(
      'INSERT INTO fields (inventory_id, name, type) VALUES (?, ?, ?)',
      [inventoryId, field.name, field.type]
    );
  }
  res.json({ inventoryId });
});

// Get all inventories
router.get('/', async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM inventories');
  res.json(rows);
});

// Update inventory
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  await db.execute(
    'UPDATE inventories SET title = ?, description = ? WHERE id = ?',
    [title, description, req.params.id]
  );
  res.json({ message: 'Inventory updated' });
});

// Delete inventory
router.delete('/:id', async (req, res) => {
  await db.execute('DELETE FROM inventories WHERE id = ?', [req.params.id]);
  res.json({ message: 'Inventory deleted' });
});

module.exports = router;
