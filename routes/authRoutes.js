// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// POST /register – create a new user account
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check that both fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Användarnamn och lösenord krävs' });
  }

  // Check if the username is already taken
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Användarnamnet är redan registrerat' });
    }

    // Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to the database
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Konto skapat' });
  } catch (err) {
    console.error(' Register error:', err);
    res.status(500).json({ error: 'Serverfel vid registrering' });
  }
});

// POST /login – log in user and return a JWT tokem
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check that both fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Ogiltigt användarnamn eller lösenord' });
  }

  // Find user in database
  try {
    const user = await User.findOne({ username });

    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Ogiltigt användarnamn eller lösenord' });
    }

    // Create JWT to generate with user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Serverfel vid inloggning' });
  }
});

/**
 * This is for dev Route: List all users for testing only
 */
// GET /users – return all users in the database (should be protected in real apps)
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });  

module.exports = router;
