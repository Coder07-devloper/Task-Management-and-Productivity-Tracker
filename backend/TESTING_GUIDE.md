# Backend Testing Guide

## 🧪 How to Test Your Backend API

After setting up MongoDB and starting your server, use these methods to test:

---

## Method 1: Using Thunder Client (VS Code Extension) - Recommended

### Install Thunder Client:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Thunder Client"
4. Install it

### Test Steps:

#### 1. Test Server is Running
- **Method:** GET
- **URL:** `http://localhost:5000/`
- **Expected Response:**
  ```json
  {
    "message": "Task Management API is running!"
  }
  ```

#### 2. Register a New User
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1"
  }
  ```
- **⚠️ IMPORTANT:** Copy the `token` - you'll need it for task endpoints!

#### 3. Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** Same as register (new token)

#### 4. Create a Task
- **Method:** POST
- **URL:** `http://localhost:5000/api/tasks`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_token_here>`
- **Body (JSON):**
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task tracker application",
    "priority": "High"
  }
  ```
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "task": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Complete project",
      "description": "Finish the task tracker application",
      "priority": "High",
      "status": "Pending",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 5. Get All Tasks
- **Method:** GET
- **URL:** `http://localhost:5000/api/tasks`
- **Headers:** 
  - `Authorization: Bearer <your_token_here>`
- **Expected Response:**
  ```json
  {
    "success": true,
    "count": 1,
    "tasks": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "title": "Complete project",
        "description": "Finish the task tracker application",
        "priority": "High",
        "status": "Pending",
        "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
  ```

#### 6. Update a Task
- **Method:** PUT
- **URL:** `http://localhost:5000/api/tasks/<task_id>`
  - Replace `<task_id>` with the actual task _id from step 4
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <your_token_here>`
- **Body (JSON):**
  ```json
  {
    "title": "Updated title",
    "priority": "Medium",
    "status": "Completed"
  }
  ```

#### 7. Mark Task as Completed
- **Method:** PATCH
- **URL:** `http://localhost:5000/api/tasks/<task_id>/complete`
- **Headers:** 
  - `Authorization: Bearer <your_token_here>`
- **Expected Response:** Task with status "Completed"

#### 8. Delete a Task
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/tasks/<task_id>`
- **Headers:** 
  - `Authorization: Bearer <your_token_here>`
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

---

## Method 2: Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create a new request for each endpoint
3. Follow the same steps as Thunder Client above

---

## Method 3: Using curl (Command Line)

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create Task (replace TOKEN with actual token):
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test task","description":"Testing","priority":"High"}'
```

### Get All Tasks:
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

---

## 🐛 Common Errors & Solutions

### Error: "MongoDB connection error"
- **Solution:** Check your MONGODB_URI in .env file
- Make sure username and password are correct
- Ensure IP is whitelisted in MongoDB Atlas

### Error: "No token provided"
- **Solution:** Make sure you're sending the Authorization header
- Format: `Authorization: Bearer <token>`
- Make sure there's a space between "Bearer" and the token

### Error: "Invalid or expired token"
- **Solution:** Login again to get a new token
- Tokens expire after 7 days

### Error: "User with this email already exists"
- **Solution:** Use a different email or login instead of registering

### Error: "Task not found"
- **Solution:** Make sure you're using the correct task ID
- Make sure the task belongs to the logged-in user

---

## ✅ Success Checklist

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Can create a task (with token)
- [ ] Can get all tasks (with token)
- [ ] Can update a task (with token)
- [ ] Can mark task as completed (with token)
- [ ] Can delete a task (with token)
- [ ] Cannot access tasks without token (should get 401 error)

---

## 🎯 Next Steps

Once all tests pass, your backend is ready! You can now:
1. Build the React frontend
2. Connect frontend to these API endpoints
3. Start building your full-stack application!

