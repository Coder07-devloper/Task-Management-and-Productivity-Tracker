/**
 * API Service
 * 
 * This file handles all communication with the backend API.
 * It uses axios to make HTTP requests to our Express backend.
 * 
 * Key functions:
 * - setAuthToken: Stores JWT token for authentication
 * - getAuthToken: Retrieves stored token
 * - API calls for authentication and tasks
 */

import axios from 'axios';

// Base URL for our backend API
// In development, React runs on port 3000, backend runs on port 5000
const API_BASE_URL = 'http://localhost:5000/api';

// Create an axios instance with default configuration
// This makes it easier to set common headers for all requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Set Authentication Token
 * 
 * When a user logs in or registers, we save their JWT token.
 * This token is then sent with every API request to authenticate the user.
 * 
 * @param {string} token - JWT token from backend
 */
export const setAuthToken = (token) => {
  if (token) {
    // Save token to localStorage (persists even after browser refresh)
    localStorage.setItem('token', token);
    
    // Set token as default header for all axios requests
    // This way, we don't need to manually add it to each request
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If token is null/undefined, remove it (for logout)
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Get Authentication Token
 * 
 * Retrieves the stored token from localStorage.
 * Useful for checking if user is logged in.
 * 
 * @returns {string|null} The stored token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Initialize Auth Token
 * 
 * When the app loads, check if there's a stored token.
 * If yes, set it in axios headers so we're authenticated.
 * This ensures users stay logged in even after refreshing the page.
 */
export const initAuthToken = () => {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
  }
};

// ==================== AUTHENTICATION API ====================

/**
 * Register a new user
 * 
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise} Response from backend with token and userId
 */
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  // If registration successful, save the token
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  
  return response.data;
};

/**
 * Login an existing user
 * 
 * @param {Object} userData - User login data
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise} Response from backend with token and userId
 */
export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  
  // If login successful, save the token
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  
  return response.data;
};

/**
 * Logout user
 * 
 * Removes the token from localStorage and axios headers.
 */
export const logoutUser = () => {
  setAuthToken(null);
};

// ==================== TASKS API ====================

/**
 * Get all tasks for the logged-in user
 * 
 * @returns {Promise} Array of tasks
 */
export const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.tasks;
};

/**
 * Create a new task
 * 
 * @param {Object} taskData - Task data
 * @param {string} taskData.title - Task title (required)
 * @param {string} taskData.description - Task description (optional)
 * @param {string} taskData.priority - Task priority: "High", "Medium", or "Low" (required)
 * @returns {Promise} Created task object
 */
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data.task;
};

/**
 * Update an existing task
 * 
 * @param {string} taskId - ID of task to update
 * @param {Object} taskData - Updated task data (all fields optional)
 * @returns {Promise} Updated task object
 */
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data.task;
};

/**
 * Delete a task
 * 
 * @param {string} taskId - ID of task to delete
 * @returns {Promise} Success message
 */
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

/**
 * Mark a task as completed
 * 
 * @param {string} taskId - ID of task to mark as completed
 * @returns {Promise} Updated task object with status "Completed"
 */
export const markTaskCompleted = async (taskId) => {
  const response = await api.patch(`/tasks/${taskId}/complete`);
  return response.data.task;
};

export default api;

