/**
 * TaskForm Component
 * 
 * Form for creating or editing tasks.
 * Can be used in two modes:
 * 1. Create mode: Creates a new task (no initial task data)
 * 2. Edit mode: Updates an existing task (receives task data as prop)
 * 
 * Props:
 * - task: Task object (if editing) or null (if creating)
 * - onSubmit: Callback when form is submitted
 * - onCancel: Callback when form is cancelled
 */

import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });

  const [error, setError] = useState('');

  /**
   * When component mounts or task prop changes,
   * populate form with task data if editing
   */
  useEffect(() => {
    if (task) {
      // Editing mode: populate form with existing task data
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
      });
    } else {
      // Create mode: reset form to empty values
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
      });
    }
  }, [task]);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    if (!formData.priority) {
      setError('Please select a priority');
      return;
    }

    // Call parent callback with form data
    if (onSubmit) {
      onSubmit({
        ...formData,
        title: formData.title.trim(), // Remove extra whitespace
      });
    }

    // Reset form after submission (only if creating new task)
    if (!task) {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
      });
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Title input */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description textarea */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              rows="4"
            />
          </div>

          {/* Priority dropdown */}
          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Form buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {task ? 'Update Task' : 'Create Task'}
            </button>
            {onCancel && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

