# Backend API - Task Management & Productivity Tracker

## 📋 Overview

This is the backend API for the Task Management & Productivity Tracker. It provides RESTful endpoints for user authentication and task management.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation/verification
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

**Important:**
- Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB credentials
- Generate a secure JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` (or the PORT specified in .env)

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables (create this)
│
├── models/                # MongoDB schemas
│   ├── User.js           # User model
│   └── Task.js           # Task model
│
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   └── tasks.js          # Task CRUD routes
│
├── controllers/           # Business logic
│   ├── authController.js # Register & login logic
│   └── taskController.js # Task CRUD logic
│
└── middleware/            # Custom middleware
    └── auth.js           # JWT verification
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (All require authentication)

- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/complete` - Mark task as completed

## 🔐 Authentication

All task endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Example API Calls

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Task
```bash
POST http://localhost:5000/api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task tracker",
  "priority": "High"
}
```

### Get All Tasks
```bash
GET http://localhost:5000/api/tasks
Authorization: Bearer <token>
```

## 🧪 Testing

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl
- Your React frontend

## 📚 Key Concepts Explained

### 1. **Middleware**
Middleware functions run between receiving a request and sending a response. Our `authMiddleware` verifies JWT tokens before allowing access to protected routes.

### 2. **JWT Tokens**
JWT (JSON Web Token) is a way to securely transmit information. When a user logs in, we create a token containing their userId. The frontend stores this token and sends it with every request.

### 3. **Password Hashing**
We never store plain text passwords. Instead, we use bcrypt to hash passwords before saving them. When a user logs in, we hash their entered password and compare it with the stored hash.

### 4. **User Isolation**
Each task has a `userId` field. When fetching tasks, we only return tasks where `userId` matches the logged-in user's ID. This ensures users can only see their own tasks.

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your MONGODB_URI in .env
- Ensure your MongoDB cluster allows connections from your IP

**JWT Errors:**
- Make sure JWT_SECRET is set in .env
- Check that token is being sent in Authorization header

**Port Already in Use:**
- Change PORT in .env file
- Or stop the process using port 5000

