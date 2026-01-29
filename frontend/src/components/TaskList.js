/**
 * TaskList Component
 * 
 * Main component for displaying and managing tasks.
 * Shows all tasks, allows filtering, and handles task operations.
 * 
 * Features:
 * - Displays all tasks in a grid/list
 * - Filter tasks by status (All, Pending, Completed)
 * - Filter tasks by priority (All, High, Medium, Low)
 * - Shows task count
 * - Handles create, update, and delete operations
 */

import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Confetti from './Confetti';
import { getAllTasks, createTask, updateTask } from '../services/api';

const TaskList = () => {
  // State for tasks array
  const [tasks, setTasks] = useState([]);
  
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  
  // State for error messages
  const [error, setError] = useState('');
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // State for task form (null = hidden, task object = editing, 'new' = creating)
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // State for confetti celebration
  const [showConfetti, setShowConfetti] = useState(false);

  /**
   * Fetch all tasks from the backend
   * Called when component mounts and after task operations
   */
  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load tasks. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch tasks when component first mounts
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Handle create task form submission
   */
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      // Refresh task list after creating
      fetchTasks();
      // Hide form
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  /**
   * Handle update task form submission
   */
  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask._id, taskData);
      // Refresh task list after updating
      fetchTasks();
      // Hide form and clear editing task
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  /**
   * Handle task form submission (both create and update)
   */
  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      // Update existing task
      handleUpdateTask(taskData);
    } else {
      // Create new task
      handleCreateTask(taskData);
    }
  };

  /**
   * Handle task deletion
   * TaskItem calls this after successful deletion
   */
  const handleTaskDelete = (taskId) => {
    // Remove task from state (optimistic update)
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  /**
   * Handle task completion
   * TaskItem calls this after marking task as completed
   * Shows confetti celebration when task is completed!
   */
  const handleTaskComplete = (updatedTask) => {
    // Update task in state
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    
    // Show confetti celebration! 🎉
    setShowConfetti(true);
  };

  /**
   * Handle edit button click from TaskItem
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Filter tasks based on selected filters
   */
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusFilter !== 'All' && task.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
      return false;
    }

    return true;
  });

  // Count tasks by status
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="task-list-container">
      {/* Confetti celebration - shows when task is completed */}
      <Confetti show={showConfetti} onClose={() => setShowConfetti(false)} />
      
      {/* Header with title and create button */}
      <div className="task-list-header">
        <h1>My Tasks</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Task form (shown when creating or editing) */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* Filters and stats */}
      <div className="task-filters">
        <div className="task-stats">
          <span>Total: {tasks.length}</span>
          <span>Pending: {pendingCount}</span>
          <span>Completed: {completedCount}</span>
        </div>

        <div className="filter-controls">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task list */}
      {loading ? (
        <div className="loading-message">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-message">
          {tasks.length === 0
            ? 'No tasks yet. Create your first task!'
            : 'No tasks match your filters.'}
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleEditTask}
              onDelete={handleTaskDelete}
              onComplete={handleTaskComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

