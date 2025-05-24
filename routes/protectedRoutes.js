/**
* This route file contains a protected endpoint that requires a valid JWT token.
* Only authenticated users can access the data returned from this route.
 */
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const movies = [
  { title: "Zootopia", genre: "Animated" },
  { title: "The Kissing Booth", genre: "Romantic" },
  { title: "Rush Hour", genre: "Action" }
];

router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Du är inloggad och har åtkomst till skyddad data.' });
});

// GET - return the current list of static favorite movies
router.get('/movies', verifyToken, (req, res) => {
  res.json(movies);
});

// POST - add new movie to memory list
router.post('/movies', verifyToken, (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    return res.status(400).json({ error: 'Titel och genre krävs' });
  }

  movies.push({ title, genre });
  res.status(201).json({ message: 'Film tillagd!' });
});

module.exports = router;
