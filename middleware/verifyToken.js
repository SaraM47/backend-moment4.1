const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from the Authorization header
 * Get the value of the Authorization header
 * If no token is provided, return 401 Unauthorized
 */
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token saknas' });
  }

  // Extract the token from "Bearer <token>"
  const token = authHeader.split(' ')[1]; 

  // Verify the token using the secret key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verify error:', err); // Token is invalid, expired or tampered with
    res.status(403).json({ error: 'Ogiltig token' });
  }
};