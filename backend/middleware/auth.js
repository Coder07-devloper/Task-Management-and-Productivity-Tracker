/**
 * Authentication Middleware
 * 
 * This middleware verifies JWT tokens sent from the frontend.
 * It protects routes that require user authentication.
 * 
 * How it works:
 * 1. Frontend sends token in Authorization header: "Bearer <token>"
 * 2. Middleware extracts the token
 * 3. Verifies token using JWT_SECRET
 * 4. If valid, adds userId to req.userId so routes can use it
 * 5. If invalid, returns 401 Unauthorized error
 */

const jwt = require('jsonwebtoken');

// This is a middleware function
// Middleware functions have access to: req (request), res (response), next (next function)
const authMiddleware = (req, res, next) => {
  try {
    // Get the Authorization header from the request
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization denied.',
      });
    }

    // Extract the token from "Bearer <token>"
    // Split by space and take the second part (index 1)
    const token = authHeader.split(' ')[1];

    // If token doesn't exist (e.g., header was just "Bearer" with no token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not found. Authorization denied.',
      });
    }

    // Verify the token using our JWT_SECRET
    // jwt.verify() decodes the token and checks if it's valid
    // If valid, it returns the payload (the data we stored in the token)
    // If invalid, it throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add userId to the request object
    // This allows our route handlers to access the userId without re-verifying the token
    // Example: In taskController, we can use req.userId to know which user is making the request
    req.userId = decoded.userId;

    // Call next() to continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails (expired, invalid, etc.)
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Authorization denied.',
    });
  }
};

module.exports = authMiddleware;

