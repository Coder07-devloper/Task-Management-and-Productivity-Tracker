/**
 * Login Component
 * 
 * This component displays a login form where users can enter their
 * email and password to log into the application.
 * 
 * Features:
 * - Email and password input fields
 * - Form validation
 * - Error message display
 * - Redirects to task list after successful login
 */

import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = ({ onLoginSuccess }) => {
  // State to store form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for error messages
  const [error, setError] = useState('');

  // State for loading (shows spinner or disables button during API call)
  const [loading, setLoading] = useState(false);

  /**
   * Handle input field changes
   * Updates the form data when user types in email or password fields
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamic property name (email or password)
    });
    // Clear error when user starts typing
    setError('');
  };

  /**
   * Handle form submission
   * Calls the login API and handles success/error responses
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Validate input
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the login API function from our api.js service
      const response = await loginUser(formData);

      // If login successful, call the parent component's callback
      // This will typically navigate to the task list or update app state
      if (onLoginSuccess) {
        onLoginSuccess(response);
      }
    } catch (err) {
      // Handle errors (invalid credentials, network error, etc.)
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {/* Display error message if login fails */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

