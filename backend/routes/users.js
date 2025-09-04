const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all users
router.get('/', async (req, res) => {
  const [users] = await db.execute('SELECT * FROM users');
  res.json(users);
});

// Search users
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const [results] = await db.execute(
    'SELECT * FROM users WHERE username LIKE ? OR email LIKE ?',
    [`%${q}%`, `%${q}%`]
  );
  res.json(results);
});

// Block user
router.put('/:id/block', async (req, res) => {
  await db.execute('UPDATE users SET blocked = 1 WHERE id = ?', [req.params.id]);
  res.json({ message: 'User blocked' });
});

// Delete user
router.delete('/:id', async (req, res) => {
  await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.json({ message: 'User deleted' });
});

module.exports = router;
