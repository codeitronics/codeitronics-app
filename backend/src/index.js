// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes'); // User routes for auth
const companyRoutes = require('./routes/companyRoutes'); // User routes for auth
const uploadRoutes = require('./routes/uploadRoutes');

const cors = require('cors');
const path = require('path');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow CORS for cross-origin requests
app.use(express.json()); // For parsing JSON payloads

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, '../../frontend/public/assets')));

// Routes
app.use('/api/blogs', blogRoutes); // Blog routes
app.use('/api/users', userRoutes); // User auth routes
app.use('/api/company', companyRoutes); // User auth routes
app.use('/api/upload', uploadRoutes);


// 404 Handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
