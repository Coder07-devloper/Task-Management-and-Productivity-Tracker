/**
 * User Model
 * 
 * Defines the structure of a User document in MongoDB.
 * This schema stores user authentication information.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
// A schema is like a blueprint that defines what fields a User document will have
const userSchema = new mongoose.Schema(
  {
    // Email field: required, must be unique, automatically converted to lowercase
    email: {
      type: String,
      required: [true, 'Email is required'], // Error message if email is missing
      unique: true, // No two users can have the same email
      lowercase: true, // Converts email to lowercase (e.g., "John@Email.com" becomes "john@email.com")
      trim: true, // Removes whitespace from beginning and end
    },
    // Password field: required, minimum 6 characters
    // Note: We store the HASHED password, not the plain text password
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Before saving a user to database, hash the password
// This is a "pre-save hook" - it runs automatically before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  // This prevents re-hashing an already hashed password
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt (random string) to add to password before hashing
    // Salt rounds = 10 means the hashing process will be repeated 2^10 times
    // Higher number = more secure but slower
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    // bcrypt.hash() takes the plain password and salt, returns hashed password
    this.password = await bcrypt.hash(this.password, salt);

    // Continue with saving the user
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored hashed password
// This method can be called on any user instance: user.comparePassword('mypassword')
userSchema.methods.comparePassword = async function (enteredPassword) {
  // bcrypt.compare() hashes the entered password and compares it with stored hash
  // Returns true if passwords match, false otherwise
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
// mongoose.model() creates a model from the schema
// 'User' is the model name, userSchema is the schema definition
// MongoDB will create a collection called 'users' (plural, lowercase)
const User = mongoose.model('User', userSchema);

module.exports = User;

