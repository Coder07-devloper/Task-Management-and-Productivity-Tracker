/**
 * App Component
 * 
 * Main component that manages the entire application.
 * Handles authentication state and routing between login/register and task list.
 * 
 * Flow:
 * 1. Check if user is logged in (has token in localStorage)
 * 2. If not logged in: Show Login/Register forms
 * 3. If logged in: Show TaskList
 * 4. Handle login/logout/register
 */

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import { initAuthToken, getAuthToken, logoutUser } from './services/api';
import { getRandomQuote } from './utils/quotes';
import './App.css';

const App = () => {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State to control which auth form to show (login or register)
  const [showRegister, setShowRegister] = useState(false);
  
  // State for loading (checking authentication status)
  const [loading, setLoading] = useState(true);
  
  // State for random motivational quote
  const [quote, setQuote] = useState(null);

  /**
   * Check authentication status when app loads
   * If there's a token in localStorage, user is logged in
   */
  useEffect(() => {
    // Initialize auth token (sets axios headers if token exists)
    initAuthToken();
    
    // Check if token exists
    const token = getAuthToken();
    setIsLoggedIn(!!token);
    setLoading(false);
    
    // Get a random quote when component mounts
    setQuote(getRandomQuote());
  }, []);

  /**
   * Handle successful login
   * Called when user logs in or registers
   */
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
  };

  /**
   * Handle logout
   * Removes token and updates state
   */
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setShowRegister(false);
  };

  // Show loading message while checking authentication
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // If user is not logged in, show login/register forms
  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="auth-wrapper">
          {/* Main heading at the top */}
          <div className="auth-heading">
            <h1>Task Management & Productivity Tracker</h1>
            <p className="auth-subtitle">Organize your tasks, boost your productivity</p>
          </div>

          {/* Main content area with form and quote */}
          <div className="auth-content">
            {/* Left side: Form */}
            <div className="auth-form-section">
              {/* Show Login or Register form based on state */}
              {showRegister ? (
                <Register onRegisterSuccess={handleAuthSuccess} />
              ) : (
                <Login onLoginSuccess={handleAuthSuccess} />
              )}

              {/* Login/Register toggle buttons below the form */}
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${!showRegister ? 'active' : ''}`}
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </button>
                <button
                  className={`auth-tab ${showRegister ? 'active' : ''}`}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Right side: Motivational quote */}
            <div className="auth-quote-section">
              {quote && (
                <div className="quote-card">
                  <div className="quote-icon">💡</div>
                  <blockquote className="quote-text">"{quote.text}"</blockquote>
                  <cite className="quote-author">— {quote.author}</cite>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, show task list
  return (
    <div className="App">
      {/* Header with logout button */}
      <header className="app-header">
        <h1>Task Management & Productivity Tracker</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main content: Task list */}
      <main className="app-main">
        <TaskList />
      </main>
    </div>
  );
};

export default App;

