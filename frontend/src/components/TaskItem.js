/**
 * TaskItem Component
 * 
 * Displays a single task as a card.
 * Shows task details and provides actions (edit, delete, mark complete).
 * 
 * Props:
 * - task: The task object to display
 * - onUpdate: Callback when task is updated
 * - onDelete: Callback when task is deleted
 * - onComplete: Callback when task is marked as completed
 */

import React, { useState } from 'react';
import { deleteTask, markTaskCompleted } from '../services/api';

const TaskItem = ({ task, onUpdate, onDelete, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle delete button click
   * Calls the delete API and triggers the onDelete callback
   */
  const handleDelete = async () => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await deleteTask(task._id);
      // Call parent callback to update the task list
      if (onDelete) {
        onDelete(task._id);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle mark as completed button click
   * Only shows if task is not already completed
   */
  const handleComplete = async () => {
    setLoading(true);
    setError('');

    try {
      const updatedTask = await markTaskCompleted(task._id);
      // Call parent callback to update the task list
      if (onComplete) {
        onComplete(updatedTask);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark task as completed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get priority badge color
   * Returns different CSS classes based on priority level
   */
  const getPriorityClass = () => {
    switch (task.priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  /**
   * Format date for display
   * Converts ISO date string to readable format
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Task header with title and priority */}
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass()}`}>
          {task.priority}
        </span>
      </div>

      {/* Task description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Task metadata (status and date) */}
      <div className="task-footer">
        <div className="task-meta">
          <span className={`status-badge ${task.status.toLowerCase()}`}>
            {task.status}
          </span>
          <span className="task-date">
            Created: {formatDate(task.createdAt)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="task-actions">
          {/* Mark as completed button (only show if not completed) */}
          {task.status !== 'Completed' && (
            <button
              className="btn btn-success btn-sm"
              onClick={handleComplete}
              disabled={loading}
            >
              Mark Complete
            </button>
          )}

          {/* Edit button (opens edit form in parent component) */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onUpdate && onUpdate(task)}
            disabled={loading}
          >
            Edit
          </button>

          {/* Delete button */}
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

