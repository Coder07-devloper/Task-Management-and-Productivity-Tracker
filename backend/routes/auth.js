/**
 * Authentication Routes
 * 
 * Defines the API endpoints for user authentication.
 * These routes handle user registration and login.
 */

const express = require('express');
const router = express.Router(); // Create a router instance

// Import controller functions
const { register, login } = require('../controllers/authController');

/**
 * POST /api/auth/register
 * 
 * Register a new user
 * 
 * Request Body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "token": "jwt_token_here",
 *   "userId": "user_id_here"
 * }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * 
 * Login an existing user
 * 
 * Request Body:
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "token": "jwt_token_here",
 *   "userId": "user_id_here"
 * }
 */
router.post('/login', login);

// Export the router so it can be used in server.js
module.exports = router;

