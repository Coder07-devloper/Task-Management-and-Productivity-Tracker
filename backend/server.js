/**
 * Main Server File
 * 
 * This is the entry point of our backend application.
 * It sets up Express server, connects to MongoDB, and registers all routes.
 */

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import route handlers
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Initialize Express app
const app = express();

// Middleware
// CORS allows our React frontend (running on different port) to communicate with backend
app.use(cors());

// This middleware parses JSON data from request body
// When frontend sends JSON data, Express can now read it as req.body
app.use(express.json());

// Connect to MongoDB
// mongoose.connect() establishes connection to our MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit the application if database connection fails
  });

// API Routes
// All authentication-related routes (register, login) will be at /api/auth
app.use('/api/auth', authRoutes);

// All task-related routes (CRUD operations) will be at /api/tasks
app.use('/api/tasks', taskRoutes);

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running!' });
});

// Start the server
// process.env.PORT allows deployment platforms (like Heroku) to set the port
// If not set, default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

