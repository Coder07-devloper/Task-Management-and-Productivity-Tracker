# Backend Code Explanation - Step by Step

## 🎯 What We've Built

We've created a complete backend API with:
- ✅ User authentication (register & login)
- ✅ JWT-based security
- ✅ Task CRUD operations
- ✅ User-specific task isolation

---

## 📂 File-by-File Explanation

### 1. **server.js** - The Entry Point

**What it does:**
- Starts the Express server
- Connects to MongoDB
- Registers all routes
- Handles middleware

**Key Concepts:**
- `express()` - Creates our web server
- `app.use(cors())` - Allows React frontend (different port) to communicate
- `app.use(express.json())` - Parses JSON from request body
- `mongoose.connect()` - Connects to MongoDB database
- `app.use('/api/auth', authRoutes)` - All `/api/auth/*` requests go to auth routes
- `app.use('/api/tasks', taskRoutes)` - All `/api/tasks/*` requests go to task routes

---

### 2. **models/User.js** - User Database Schema

**What it does:**
- Defines what a User document looks like in MongoDB
- Automatically hashes passwords before saving
- Provides method to compare passwords

**Key Concepts:**
- **Schema:** Blueprint for documents in MongoDB
- **Pre-save hook:** Function that runs automatically before saving
  - `userSchema.pre('save', ...)` - Runs before every save
  - Hashes password using bcrypt
- **Instance method:** Function available on user objects
  - `user.comparePassword()` - Compares plain password with hashed password

**Why hash passwords?**
- If database is compromised, attackers can't see actual passwords
- bcrypt creates a one-way hash (can't reverse it)

---

### 3. **models/Task.js** - Task Database Schema

**What it does:**
- Defines what a Task document looks like
- Links each task to a user via `userId`

**Key Concepts:**
- **enum:** Restricts values to specific options
  - `priority: ['High', 'Medium', 'Low']` - Only these values allowed
  - `status: ['Pending', 'Completed']` - Only these values allowed
- **default:** Value assigned if not provided
  - `status: default: 'Pending'` - New tasks start as Pending
- **ObjectId reference:** Links to User document
  - `userId: { type: ObjectId, ref: 'User' }` - References User model

**Why userId?**
- Ensures each task belongs to a specific user
- Allows filtering: "Show me all tasks where userId = myId"

---

### 4. **middleware/auth.js** - JWT Verification

**What it does:**
- Protects routes that require authentication
- Verifies JWT token from request header
- Extracts userId and adds it to request object

**How it works:**
1. Frontend sends: `Authorization: Bearer <token>`
2. Middleware extracts token
3. Verifies token using JWT_SECRET
4. If valid: adds `req.userId` and continues
5. If invalid: returns 401 error

**Why middleware?**
- Reusable: One middleware protects all routes
- Clean: Routes don't need to verify tokens themselves
- Secure: Centralized authentication logic

---

### 5. **controllers/authController.js** - Authentication Logic

**register() function:**
1. Validates email and password
2. Checks if user already exists
3. Creates new user (password auto-hashed by User model)
4. Generates JWT token
5. Returns token and userId

**login() function:**
1. Validates email and password
2. Finds user by email
3. Compares password using `user.comparePassword()`
4. If match: generates JWT token
5. Returns token and userId

**generateToken() function:**
- Creates JWT containing userId
- Expires in 7 days
- Signed with JWT_SECRET (only server can verify)

---

### 6. **controllers/taskController.js** - Task CRUD Logic

**getAllTasks():**
- Uses `req.userId` from auth middleware
- Finds all tasks where `userId` matches
- Returns only that user's tasks

**createTask():**
- Validates input (title, priority required)
- Creates task with `userId` from auth middleware
- Status defaults to "Pending"

**updateTask():**
- Finds task by ID AND userId (security check)
- Only updates if task belongs to user
- Updates provided fields

**deleteTask():**
- Finds task by ID AND userId (security check)
- Only deletes if task belongs to user

**markTaskCompleted():**
- Finds task by ID AND userId
- Sets status to "Completed"

**Security Pattern:**
Every task operation checks: `Task.findOne({ _id: taskId, userId })`
- This ensures users can only access their own tasks
- Even if someone knows a task ID, they can't access it if it's not theirs

---

### 7. **routes/auth.js** - Authentication Endpoints

**What it does:**
- Maps URLs to controller functions
- `POST /api/auth/register` → `register()` controller
- `POST /api/auth/login` → `login()` controller

**Why separate routes?**
- Keeps code organized
- Easy to add more auth routes later
- Clean separation of concerns

---

### 8. **routes/tasks.js** - Task Endpoints

**What it does:**
- Maps URLs to controller functions
- All routes use `authMiddleware` (protects them)
- `GET /api/tasks` → `getAllTasks()`
- `POST /api/tasks` → `createTask()`
- `PUT /api/tasks/:id` → `updateTask()`
- `DELETE /api/tasks/:id` → `deleteTask()`
- `PATCH /api/tasks/:id/complete` → `markTaskCompleted()`

**URL Parameters:**
- `:id` in URL (e.g., `/api/tasks/123`) becomes `req.params.id` in controller

**Middleware Chain:**
```
Request → authMiddleware (verifies token) → Controller (handles logic) → Response
```

---

## 🔄 Complete Request Flow Example

### Example: Creating a Task

1. **Frontend sends request:**
   ```
   POST http://localhost:5000/api/tasks
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Content-Type: application/json
   
   {
     "title": "Complete project",
     "description": "Finish the task tracker",
     "priority": "High"
   }
   ```

2. **server.js receives request:**
   - Routes to `/api/tasks` → goes to `routes/tasks.js`

3. **routes/tasks.js:**
   - Matches `POST /` → calls `createTask` controller
   - But first: runs `authMiddleware`

4. **middleware/auth.js:**
   - Extracts token from `Authorization` header
   - Verifies token with JWT_SECRET
   - Decodes token to get userId
   - Adds `req.userId = "user123"` to request
   - Calls `next()` to continue

5. **controllers/taskController.js - createTask():**
   - Gets `req.userId = "user123"` from middleware
   - Gets task data from `req.body`
   - Creates task: `Task.create({ title, description, priority, userId: "user123" })`
   - Saves to MongoDB
   - Returns response with created task

6. **Response sent to frontend:**
   ```json
   {
     "success": true,
     "message": "Task created successfully",
     "task": {
       "_id": "task456",
       "title": "Complete project",
       "priority": "High",
       "status": "Pending",
       "userId": "user123",
       "createdAt": "2024-01-01T00:00:00.000Z"
     }
   }
   ```

---

## 🔐 Security Features

1. **Password Hashing:**
   - Passwords never stored in plain text
   - bcrypt creates irreversible hash

2. **JWT Tokens:**
   - Contains userId (not password)
   - Signed with secret key
   - Expires after 7 days

3. **User Isolation:**
   - Every task query filters by userId
   - Users can't access other users' tasks

4. **Input Validation:**
   - Required fields checked
   - Enum values validated
   - Error messages returned

---

## 📊 Database Structure

### Users Collection
```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  password: "$2a$10$hashedpassword...", // Hashed, never plain text
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId("..."),
  title: "Complete project",
  description: "Finish the task tracker",
  priority: "High",
  status: "Pending",
  userId: ObjectId("user_id_here"), // Links to User
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✅ What's Next?

The backend is complete! Now you can:

1. **Test the API** using Postman or Thunder Client
2. **Build the Frontend** (React components)
3. **Connect Frontend to Backend** (API calls)

The backend is ready to receive requests from your React frontend! 🚀

