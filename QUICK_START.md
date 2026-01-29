# 🚀 Quick Start Guide

Follow these steps to get your backend up and running!

---

## Step 1: Set Up MongoDB (5-10 minutes)

Follow the detailed guide in `MONGODB_SETUP_GUIDE.md` to:
1. Create MongoDB Atlas account
2. Create a cluster
3. Get your connection string

**Quick Summary:**
- Go to https://www.mongodb.com/cloud/atlas/register
- Create free cluster
- Create database user (save username & password!)
- Whitelist your IP (or allow from anywhere for development)
- Copy connection string

---

## Step 2: Create .env File

1. Copy `backend/env.template` to `backend/.env`
2. Edit `backend/.env` and replace:
   - `<username>` with your MongoDB username
   - `<password>` with your MongoDB password
   - `<cluster>` with your cluster address
   - `your_super_secret_jwt_key_change_this_in_production` with a secure random string

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Example .env file:**
```env
MONGODB_URI=mongodb+srv://tasktracker:MyPassword123@cluster0.abc123.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
PORT=5000
```

---

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
```

**If you see errors:**
- Check your `.env` file (MONGODB_URI and JWT_SECRET)
- Make sure MongoDB cluster is running
- Verify IP is whitelisted in MongoDB Atlas

---

## Step 5: Test the Backend

### Option A: Automated Test Script (Easiest)

In a **new terminal** (keep server running), run:

```bash
cd backend
node test-api.js
```

This will automatically test all endpoints and show you results!

### Option B: Manual Testing

Use Thunder Client (VS Code extension) or Postman. See `backend/TESTING_GUIDE.md` for detailed instructions.

**Quick Test:**
1. Open Thunder Client in VS Code
2. Test: `GET http://localhost:5000/` (should return welcome message)
3. Register: `POST http://localhost:5000/api/auth/register` with body:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
4. Copy the token from response
5. Create task: `POST http://localhost:5000/api/tasks` with:
   - Header: `Authorization: Bearer <your_token>`
   - Body:
     ```json
     {
       "title": "Test task",
       "description": "Testing",
       "priority": "High"
     }
     ```

---

## ✅ Success Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] `.env` file created with correct values
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Can register a user
- [ ] Can login
- [ ] Can create a task (with token)
- [ ] Can get all tasks (with token)

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Double-check MONGODB_URI in `.env`
- Make sure username/password are correct (no special characters need encoding)
- Verify IP is whitelisted in MongoDB Atlas
- Check if cluster is running (should show green in Atlas dashboard)

### "JWT_SECRET is required"
- Make sure `.env` file exists in `backend/` folder
- Check that JWT_SECRET is set in `.env`
- Restart the server after creating/editing `.env`

### "Port 5000 already in use"
- Change PORT in `.env` to another number (e.g., 5001)
- Or stop the process using port 5000

### "Module not found"
- Run `npm install` in the `backend` folder
- Make sure you're in the correct directory

---

## 📚 Next Steps

Once your backend is working:

1. **Test all endpoints** using the test script or Thunder Client
2. **Build the React frontend** (we'll do this next!)
3. **Connect frontend to backend** using API calls

---

## 🎯 Need Help?

- Check `MONGODB_SETUP_GUIDE.md` for MongoDB setup
- Check `backend/TESTING_GUIDE.md` for testing instructions
- Check `BACKEND_EXPLANATION.md` for code explanations
- Check `PROJECT_STRUCTURE.md` for project overview

---

**You're ready to go! 🚀**

