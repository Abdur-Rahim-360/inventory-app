const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const db = require('./models/db');
const app = express();

// allow frontend to send/receive cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,            // set true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// auth routes
app.use('/api/auth', require('./routes/auth'));
// other routes...
app.use('/api/items',  require('./routes/items'));
app.use('/api/inventories', require('./routes/inventories'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

db.execute('SELECT 1')
  .then(() => console.log('✅ MySQL connected successfully'))
  .catch(err => console.error('❌ MySQL connection failed:', err.message));
