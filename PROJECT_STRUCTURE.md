# Task Management & Productivity Tracker - Project Structure

## 📁 Simple Folder Structure

```
Task Management and Productivity Tracker/
│
├── backend/                    # Node.js + Express backend
│   ├── server.js              # Main server entry point
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables (JWT secret, DB URL)
│   │
│   ├── models/                # MongoDB schemas (Mongoose models)
│   │   ├── User.js            # User schema (email, password)
│   │   └── Task.js            # Task schema (title, description, priority, status, userId)
│   │
│   ├── routes/                # API route handlers
│   │   ├── auth.js            # Authentication routes (register, login)
│   │   └── tasks.js           # Task CRUD routes
│   │
│   ├── middleware/            # Custom middleware functions
│   │   └── auth.js           # JWT verification middleware
│   │
│   └── controllers/           # Business logic (optional, but keeps routes clean)
│       ├── authController.js  # Register & login logic
│       └── taskController.js  # Task CRUD logic
│
└── frontend/                   # React frontend
    ├── package.json           # Frontend dependencies
    ├── public/                # Static files
    │   └── index.html
    ├── src/
    │   ├── App.js             # Main App component
    │   ├── index.js           # React entry point
    │   ├── index.css          # Global styles
    │   │
    │   ├── components/        # React components
    │   │   ├── Login.js       # Login form
    │   │   ├── Register.js    # Registration form
    │   │   ├── TaskList.js    # Display all tasks
    │   │   ├── TaskForm.js    # Create/Edit task form
    │   │   └── TaskItem.js    # Individual task card
    │   │
    │   ├── services/          # API calls to backend
    │   │   └── api.js         # Axios/fetch functions for API calls
    │   │
    │   └── utils/             # Helper functions
    │       └── auth.js        # Token management (save/get from localStorage)
│
└── README.md                   # Project documentation
```

---

## 🔄 Data Flow Explanation

### 1. **User Registration Flow:**
```
Frontend (Register.js)
    ↓ User fills form (email, password)
    ↓ Calls: POST /api/auth/register
    ↓
Backend (authController.js)
    ↓ Validates input
    ↓ Hashes password with bcrypt
    ↓ Creates user in MongoDB
    ↓ Returns: { token, userId }
    ↓
Frontend
    ↓ Saves token to localStorage
    ↓ Redirects to dashboard
```

### 2. **User Login Flow:**
```
Frontend (Login.js)
    ↓ User enters email & password
    ↓ Calls: POST /api/auth/login
    ↓
Backend (authController.js)
    ↓ Finds user by email
    ↓ Compares password with bcrypt
    ↓ If match: generates JWT token
    ↓ Returns: { token, userId }
    ↓
Frontend
    ↓ Saves token to localStorage
    ↓ Redirects to dashboard
```

### 3. **Create Task Flow:**
```
Frontend (TaskForm.js)
    ↓ User fills task form (title, description, priority)
    ↓ Calls: POST /api/tasks
    ↓ Headers: { Authorization: "Bearer <token>" }
    ↓
Backend (auth middleware)
    ↓ Verifies JWT token
    ↓ Extracts userId from token
    ↓
Backend (taskController.js)
    ↓ Creates task with userId
    ↓ Saves to MongoDB
    ↓ Returns: { task }
    ↓
Frontend
    ↓ Updates task list
```

### 4. **View Tasks Flow:**
```
Frontend (TaskList.js)
    ↓ On component mount
    ↓ Calls: GET /api/tasks
    ↓ Headers: { Authorization: "Bearer <token>" }
    ↓
Backend (auth middleware)
    ↓ Verifies JWT token
    ↓ Extracts userId
    ↓
Backend (taskController.js)
    ↓ Finds all tasks where userId matches
    ↓ Returns: [tasks]
    ↓
Frontend
    ↓ Displays tasks
```

---

## 📊 MongoDB Schemas

### **User Schema:**
```javascript
{
  email: String (required, unique, lowercase)
  password: String (required, hashed with bcrypt)
  createdAt: Date (auto-generated)
}
```

### **Task Schema:**
```javascript
{
  title: String (required)
  description: String (optional)
  priority: String (required, enum: ["High", "Medium", "Low"])
  status: String (required, enum: ["Pending", "Completed"], default: "Pending")
  userId: ObjectId (required, references User)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Important:** The `userId` field ensures each user only sees their own tasks!

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Purpose | Auth Required | Request Body |
|--------|----------|---------|---------------|--------------|
| POST | `/api/auth/register` | Register new user | No | `{ email, password }` |
| POST | `/api/auth/login` | Login user | No | `{ email, password }` |

**Response Format:**
```json
{
  "token": "jwt_token_here",
  "userId": "user_id_here"
}
```

---

### **Task Routes** (`/api/tasks`)

| Method | Endpoint | Purpose | Auth Required | Request Body |
|--------|----------|---------|---------------|--------------|
| GET | `/api/tasks` | Get all tasks of logged-in user | Yes | None |
| POST | `/api/tasks` | Create new task | Yes | `{ title, description, priority }` |
| PUT | `/api/tasks/:id` | Update a task | Yes | `{ title, description, priority, status }` |
| DELETE | `/api/tasks/:id` | Delete a task | Yes | None |
| PATCH | `/api/tasks/:id/complete` | Mark task as completed | Yes | None |

**Response Format (GET /api/tasks):**
```json
[
  {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the task tracker",
    "priority": "High",
    "status": "Pending",
    "userId": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Auth Header Format:**
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Security Notes

1. **JWT Token:** Contains `userId` and `email`, expires in 7 days
2. **Password Hashing:** bcrypt with salt rounds (10)
3. **User Isolation:** Tasks filtered by `userId` - users can only see their own tasks
4. **Token Storage:** Frontend stores token in `localStorage`

---

## 📝 Next Steps

Now we'll build the backend step-by-step:
1. Initialize backend project (package.json, dependencies)
2. Set up Express server
3. Connect to MongoDB
4. Create User and Task models
5. Create authentication middleware
6. Create auth routes (register, login)
7. Create task routes (CRUD operations)

Let's start! 🚀

