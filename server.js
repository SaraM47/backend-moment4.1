// Load environment variables from .env file and imported required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing for incoming requests
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/auth', authRoutes);   // register/login
app.use('/api/protected', protectedRoutes); // require JWT token


// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB error:', err));
