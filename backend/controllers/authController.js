/**
 * Authentication Controller
 * 
 * Contains the business logic for user registration and login.
 * This keeps our routes clean and organized.
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * 
 * Creates a JSON Web Token containing user information.
 * Token expires in 7 days.
 * 
 * @param {string} userId - The user's ID from MongoDB
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  // jwt.sign() creates a token
  // First parameter: payload (data to store in token)
  // Second parameter: secret key (from .env)
  // Third parameter: options (expiration time)
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

/**
 * Register a new user
 * 
 * Flow:
 * 1. Check if user with email already exists
 * 2. Create new user (password will be hashed automatically by User model)
 * 3. Generate JWT token
 * 4. Return token and user ID
 */
const register = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Check if user already exists
    // User.findOne() searches for a user with the given email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create new user
    // The password will be automatically hashed by the pre-save hook in User model
    const user = await User.create({
      email,
      password, // This will be hashed before saving
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return success response with token and user ID
    // We don't return the password (even hashed) for security
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      userId: user._id,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

/**
 * Login an existing user
 * 
 * Flow:
 * 1. Find user by email
 * 2. Check if user exists
 * 3. Compare entered password with stored hashed password
 * 4. If match, generate JWT token
 * 5. Return token and user ID
 */
const login = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by email
    // We need to explicitly select the password field because
    // by default, Mongoose doesn't return password (if we set select: false in schema)
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare entered password with stored hashed password
    // user.comparePassword() is a method we defined in User model
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Password is correct, generate JWT token
    const token = generateToken(user._id);

    // Return success response with token and user ID
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userId: user._id,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// Export the controller functions
module.exports = {
  register,
  login,
};

