# 🚀 How to Run the Full-Stack Application

## ✅ Prerequisites

1. ✅ Backend is set up and tested
2. ✅ MongoDB is connected
3. ✅ Frontend code is created

---

## 📋 Step-by-Step Guide

### Step 1: Start the Backend Server

Open a **terminal/command prompt** and run:

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
```

**Keep this terminal open!** The backend must stay running.

---

### Step 2: Install Frontend Dependencies

Open a **NEW terminal/command prompt** (keep backend running) and run:

```bash
cd frontend
npm install
```

This will install React and all frontend dependencies. Wait for it to complete.

---

### Step 3: Start the Frontend

In the same frontend terminal, run:

```bash
npm start
```

This will:
- Start the React development server
- Automatically open your browser at `http://localhost:3000`
- Show your application!

---

## 🎯 Using the Application

### First Time Setup:

1. **Register an Account**
   - The app will show Login/Register forms
   - Click "Register" tab
   - Enter email and password
   - Click "Register"
   - You'll be automatically logged in!

2. **Create Your First Task**
   - Click "+ New Task" button
   - Fill in:
     - Title: "Complete project"
     - Description: "Finish the task tracker"
     - Priority: Select High/Medium/Low
   - Click "Create Task"

3. **Manage Tasks**
   - View all tasks in the grid
   - Click "Edit" to modify a task
   - Click "Mark Complete" to finish a task
   - Click "Delete" to remove a task
   - Use filters to find specific tasks

4. **Logout**
   - Click "Logout" button in the header
   - You'll be redirected to login page

---

## 📱 What You'll See

### Login/Register Page:
- Clean gradient background
- Toggle between Login and Register
- Form validation
- Error messages if something goes wrong

### Task Dashboard:
- Header with app title and logout button
- Task statistics (Total, Pending, Completed)
- Filter dropdowns (Status and Priority)
- Grid of task cards
- Each task shows:
  - Title and description
  - Priority badge (High/Medium/Low)
  - Status badge (Pending/Completed)
  - Action buttons (Edit, Delete, Complete)

---

## 🔧 Troubleshooting

### Frontend won't start:
- Make sure you're in the `frontend` folder
- Run `npm install` first
- Check for error messages in terminal

### "Cannot connect to backend":
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify `.env` file has correct MongoDB URI

### Blank page or errors:
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Check Network tab to see if API calls are failing

### API calls failing with CORS errors:
- Backend should already have CORS enabled
- Make sure backend is running
- Check that backend allows `localhost:3000`

---

## 📊 Application Flow

```
Browser (localhost:3000)
    ↓
React Frontend
    ↓
API Calls (axios)
    ↓
Backend Server (localhost:5000)
    ↓
MongoDB Database
    ↓
Response back through chain
    ↓
UI Updates in React
```

---

## ✅ Success Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Can register a new account
- [ ] Can login with registered account
- [ ] Can create a task
- [ ] Can view tasks
- [ ] Can edit a task
- [ ] Can delete a task
- [ ] Can mark task as completed
- [ ] Can filter tasks by status and priority
- [ ] Can logout

---

## 🎓 For Interviews

**What to explain:**

1. **Architecture**: Frontend (React) communicates with Backend (Express) via REST API
2. **Authentication**: JWT tokens stored in localStorage, sent with each request
3. **State Management**: React useState and useEffect for component state
4. **API Service**: Centralized API calls in `api.js` for easy maintenance
5. **Component Structure**: Modular components (Login, Register, TaskList, TaskItem, TaskForm)
6. **User Isolation**: Backend filters tasks by userId, so users only see their own tasks

**Key Files to Reference:**
- `frontend/src/services/api.js` - API communication
- `frontend/src/App.js` - Main app logic and routing
- `frontend/src/components/TaskList.js` - Task management logic
- `backend/controllers/taskController.js` - Backend business logic
- `backend/middleware/auth.js` - Authentication middleware

---

## 🎉 Congratulations!

You now have a **complete full-stack application** running!

- ✅ User authentication
- ✅ Task CRUD operations
- ✅ Clean, simple UI
- ✅ Interview-friendly code
- ✅ Well-documented

**You're ready to demonstrate your full-stack skills!** 🚀

