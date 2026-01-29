/**
 * Register Component
 * 
 * This component displays a registration form where new users can
 * create an account by providing their email and password.
 * 
 * Features:
 * - Email and password input fields
 * - Password confirmation field
 * - Form validation
 * - Error message display
 * - Automatically logs in user after successful registration
 */

import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = ({ onRegisterSuccess }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State for error messages
  const [error, setError] = useState('');

  // State for loading
  const [loading, setLoading] = useState(false);

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check password length (minimum 6 characters as per backend validation)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the register API function
      // Only send email and password (not confirmPassword)
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
      });

      // If registration successful, call the parent component's callback
      // User is automatically logged in after registration
      if (onRegisterSuccess) {
        onRegisterSuccess(response);
      }
    } catch (err) {
      // Handle errors (email already exists, network error, etc.)
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        {/* Display error message if registration fails */}
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
              placeholder="Enter your password (min. 6 characters)"
              required
            />
          </div>

          {/* Password confirmation field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

