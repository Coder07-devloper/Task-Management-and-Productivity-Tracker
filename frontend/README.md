# Frontend - Task Management & Productivity Tracker

## 📋 Overview

This is the React frontend for the Task Management & Productivity Tracker. It provides a clean, simple, and user-friendly interface for managing tasks.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This will install:
- `react` & `react-dom` - React library
- `react-scripts` - Build tools for React
- `axios` - HTTP client for API calls

### 2. Start the Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

**Note:** Make sure your backend server is running on `http://localhost:5000` (see backend README)

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
│
├── src/
│   ├── components/         # React components
│   │   ├── Login.js        # Login form
│   │   ├── Register.js     # Registration form
│   │   ├── TaskList.js     # Main task list component
│   │   ├── TaskItem.js     # Individual task card
│   │   └── TaskForm.js     # Create/Edit task form
│   │
│   ├── services/           # API communication
│   │   └── api.js          # All backend API calls
│   │
│   ├── App.js              # Main App component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
│
└── package.json            # Dependencies
```

## 🎯 Key Features

1. **User Authentication**
   - Register new account
   - Login with email/password
   - Automatic token management
   - Persistent login (stays logged in after refresh)

2. **Task Management**
   - Create new tasks (title, description, priority)
   - View all tasks (only your own)
   - Edit existing tasks
   - Delete tasks
   - Mark tasks as completed

3. **Task Filtering**
   - Filter by status (All, Pending, Completed)
   - Filter by priority (All, High, Medium, Low)
   - View task statistics

4. **Clean UI**
   - Simple, intuitive design
   - Responsive layout (works on mobile too)
   - Clear error messages
   - Loading states

## 🔧 How It Works

### Authentication Flow

1. **Register/Login**: User enters email and password
2. **API Call**: Frontend sends request to backend
3. **Token Received**: Backend returns JWT token
4. **Token Stored**: Token saved in `localStorage`
5. **Header Set**: Token added to all future API requests
6. **Access Granted**: User sees task list

### Task Operations Flow

1. **Create Task**: User fills form → API call → Task added to list
2. **View Tasks**: On load → API call → Display all user's tasks
3. **Update Task**: User clicks Edit → Form pre-filled → API call → List updated
4. **Delete Task**: User clicks Delete → Confirm → API call → Task removed
5. **Complete Task**: User clicks Complete → API call → Status updated

### Data Flow

```
User Action (e.g., Create Task)
    ↓
Component (TaskForm.js)
    ↓
API Service (api.js)
    ↓
HTTP Request (axios)
    ↓
Backend API (Express)
    ↓
Database (MongoDB)
    ↓
Response back to Frontend
    ↓
State Update (React)
    ↓
UI Update (Re-render)
```

## 🔌 API Configuration

The frontend connects to the backend API. By default, it expects the backend to be running on:

```
http://localhost:5000
```

If your backend runs on a different port, update `API_BASE_URL` in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

## 📱 Components Explained

### App.js
- Main component that manages authentication state
- Shows Login/Register if not logged in
- Shows TaskList if logged in
- Handles logout

### Login.js & Register.js
- Form components for authentication
- Handle form submission
- Call API service functions
- Show error messages

### TaskList.js
- Main task management component
- Fetches and displays all tasks
- Handles filtering and search
- Manages task form (create/edit)

### TaskItem.js
- Displays a single task card
- Shows task details (title, description, priority, status)
- Provides action buttons (Edit, Delete, Complete)

### TaskForm.js
- Form for creating or editing tasks
- Can be used in "create" mode or "edit" mode
- Validates input before submission

### api.js
- All API communication logic
- Handles token management
- Provides functions for all backend endpoints
- Error handling

## 🎨 Styling

- **Clean and Simple**: Minimal design, easy to understand
- **No Heavy Libraries**: Plain CSS, no complex frameworks
- **Responsive**: Works on desktop, tablet, and mobile
- **Interview-Friendly**: Easy to explain styling choices

## 🐛 Troubleshooting

**"Network Error" or "Failed to fetch":**
- Make sure backend server is running on port 5000
- Check backend URL in `api.js`

**"401 Unauthorized" errors:**
- Token might be expired or invalid
- Try logging out and logging back in
- Check if token is being saved in localStorage

**Blank page or errors:**
- Check browser console for errors
- Make sure all dependencies are installed (`npm install`)
- Clear browser cache and refresh

**CORS errors:**
- Make sure backend has CORS enabled (we already set this up)
- Check that backend is running

## ✅ Next Steps

1. **Test the Application**:
   - Register a new account
   - Create some tasks
   - Try editing and deleting tasks
   - Test filters

2. **Customize** (optional):
   - Add more features
   - Customize colors/styles
   - Add animations

3. **Deploy** (when ready):
   - Frontend: Deploy to Netlify, Vercel, or similar
   - Backend: Deploy to Heroku, Railway, or similar
   - Update API URL in production

## 📚 Key Concepts for Interviews

### React Hooks Used:
- `useState`: Manage component state (tasks, form data, etc.)
- `useEffect`: Fetch data on component mount, handle side effects

### State Management:
- Local state in each component
- No Redux (kept simple for this project)

### API Communication:
- Axios for HTTP requests
- JWT tokens in localStorage
- Token sent in Authorization header

### Component Structure:
- Functional components only (no class components)
- Props for data flow
- Callbacks for parent-child communication

---

**Your full-stack application is ready! 🎉**

