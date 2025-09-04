const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  const { q } = req.query;
  const [results] = await db.execute(
    'SELECT * FROM items WHERE MATCH(values_json) AGAINST(? IN NATURAL LANGUAGE MODE)',
    [q]
  );
  res.json(results);
});

module.exports = router;
