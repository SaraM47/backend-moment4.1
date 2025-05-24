/**
* This route file contains a protected endpoint that requires a valid JWT token.
* Only authenticated users can access the data returned from this route.
 */
const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Du är inloggad och har åtkomst till skyddad data.' });
});

// Protected route: Return static favorite movies
router.get('/movies', verifyToken, (req, res) => {
  res.json([
    { title: "Zootopia", genre: "Animated" },
    { title: "The Kissing Booth", genre: "Romantic" },
    { title: "Rush Hour", genre: "Action" }
  ]);
});

module.exports = router;
