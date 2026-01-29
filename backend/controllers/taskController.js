/**
 * Task Controller
 * 
 * Contains the business logic for all task-related operations.
 * All operations are filtered by userId to ensure users only see their own tasks.
 */

const Task = require('../models/Task');

/**
 * Get all tasks for the logged-in user
 * 
 * Flow:
 * 1. Get userId from req.userId (set by auth middleware)
 * 2. Find all tasks where userId matches
 * 3. Return tasks array
 */
const getAllTasks = async (req, res) => {
  try {
    // req.userId is set by the auth middleware after verifying the JWT token
    const userId = req.userId;

    // Find all tasks that belong to this user
    // Task.find() searches for documents matching the query
    // { userId } is shorthand for { userId: userId }
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

/**
 * Create a new task
 * 
 * Flow:
 * 1. Get userId from req.userId
 * 2. Extract task data from request body
 * 3. Create new task with userId
 * 4. Return created task
 */
const createTask = async (req, res) => {
  try {
    // Get userId from auth middleware
    const userId = req.userId;

    // Extract task data from request body
    const { title, description, priority } = req.body;

    // Validate required fields
    if (!title || !priority) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and priority',
      });
    }

    // Validate priority value
    if (!['High', 'Medium', 'Low'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be High, Medium, or Low',
      });
    }

    // Create new task
    // Status defaults to "Pending" (defined in Task schema)
    const task = await Task.create({
      title,
      description: description || '', // Use empty string if description not provided
      priority,
      userId, // Link task to the logged-in user
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message,
    });
  }
};

/**
 * Update an existing task
 * 
 * Flow:
 * 1. Get userId and task ID from request
 * 2. Find task by ID and verify it belongs to the user
 * 3. Update task with new data
 * 4. Return updated task
 */
const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id; // Get task ID from URL parameter

    // Extract update data from request body
    const { title, description, priority, status } = req.body;

    // Find the task and verify it belongs to the user
    // This ensures users can only update their own tasks
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to update it',
      });
    }

    // Update task fields (only update fields that are provided)
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority) {
      if (!['High', 'Medium', 'Low'].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Priority must be High, Medium, or Low',
        });
      }
      task.priority = priority;
    }
    if (status) {
      if (!['Pending', 'Completed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status must be Pending or Completed',
        });
      }
      task.status = status;
    }

    // Save the updated task
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message,
    });
  }
};

/**
 * Delete a task
 * 
 * Flow:
 * 1. Get userId and task ID from request
 * 2. Find task by ID and verify it belongs to the user
 * 3. Delete the task
 * 4. Return success message
 */
const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    // Find the task and verify it belongs to the user
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to delete it',
      });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

/**
 * Mark a task as completed
 * 
 * Flow:
 * 1. Get userId and task ID from request
 * 2. Find task by ID and verify it belongs to the user
 * 3. Update status to "Completed"
 * 4. Return updated task
 */
const markTaskCompleted = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    // Find the task and verify it belongs to the user
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission to update it',
      });
    }

    // Update status to "Completed"
    task.status = 'Completed';
    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task marked as completed',
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking task as completed',
      error: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
};

