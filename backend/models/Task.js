/**
 * Task Model
 * 
 * Defines the structure of a Task document in MongoDB.
 * Each task belongs to a specific user (via userId field).
 */

const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    // Title of the task: required field
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true, // Removes whitespace
    },
    // Description: optional field
    description: {
      type: String,
      trim: true,
    },
    // Priority: must be one of the three values
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Priority must be High, Medium, or Low',
      },
    },
    // Status: defaults to "Pending" when task is created
    status: {
      type: String,
      required: true,
      enum: {
        values: ['Pending', 'Completed'],
        message: 'Status must be Pending or Completed',
      },
      default: 'Pending', // New tasks start as "Pending"
    },
    // userId: links the task to the user who created it
    // This is a reference to the User model
    // ObjectId is MongoDB's unique identifier type
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the Task model
// MongoDB will create a collection called 'tasks' (plural, lowercase)
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

