/**
 * Task Routes
 * 
 * Defines the API endpoints for task CRUD operations.
 * All routes are protected by authentication middleware.
 */

const express = require('express');
const router = express.Router(); // Create a router instance

// Import authentication middleware
// This middleware will verify JWT tokens before allowing access to routes
const authMiddleware = require('../middleware/auth');

// Import controller functions
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
} = require('../controllers/taskController');

/**
 * All routes below use authMiddleware
 * This means the user must be logged in (have a valid JWT token) to access these routes
 * 
 * The middleware:
 * 1. Checks for token in Authorization header
 * 2. Verifies the token
 * 3. Adds userId to req.userId
 * 4. Calls next() to continue to the route handler
 */

/**
 * GET /api/tasks
 * 
 * Get all tasks for the logged-in user
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Response:
 * {
 *   "success": true,
 *   "count": 2,
 *   "tasks": [
 *     {
 *       "_id": "task_id",
 *       "title": "Complete project",
 *       "description": "Finish the task tracker",
 *       "priority": "High",
 *       "status": "Pending",
 *       "userId": "user_id",
 *       "createdAt": "2024-01-01T00:00:00.000Z"
 *     }
 *   ]
 * }
 */
router.get('/', authMiddleware, getAllTasks);

/**
 * POST /api/tasks
 * 
 * Create a new task
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * Request Body:
 * {
 *   "title": "Complete project",
 *   "description": "Finish the task tracker",
 *   "priority": "High"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Task created successfully",
 *   "task": { ... }
 * }
 */
router.post('/', authMiddleware, createTask);

/**
 * PUT /api/tasks/:id
 * 
 * Update an existing task
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL Parameter:
 * :id - The task ID to update
 * 
 * Request Body (all fields optional):
 * {
 *   "title": "Updated title",
 *   "description": "Updated description",
 *   "priority": "Medium",
 *   "status": "Completed"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Task updated successfully",
 *   "task": { ... }
 * }
 */
router.put('/:id', authMiddleware, updateTask);

/**
 * DELETE /api/tasks/:id
 * 
 * Delete a task
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL Parameter:
 * :id - The task ID to delete
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Task deleted successfully"
 * }
 */
router.delete('/:id', authMiddleware, deleteTask);

/**
 * PATCH /api/tasks/:id/complete
 * 
 * Mark a task as completed
 * 
 * Headers:
 * Authorization: Bearer <token>
 * 
 * URL Parameter:
 * :id - The task ID to mark as completed
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Task marked as completed",
 *   "task": { ... }
 * }
 */
router.patch('/:id/complete', authMiddleware, markTaskCompleted);

// Export the router so it can be used in server.js
module.exports = router;

