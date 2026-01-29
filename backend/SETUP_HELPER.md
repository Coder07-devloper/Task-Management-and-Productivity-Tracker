# 🛠️ Backend Setup Helper

## ✅ What's Done

- ✅ Node.js and npm are installed
- ✅ Dependencies installed successfully
- ✅ JWT secret generated

## 📝 Next Steps: Create Your .env File

### Step 1: Create `.env` file

Create a new file named `.env` in the `backend` folder.

### Step 2: Add this content to `.env`

Replace the MongoDB connection string with your own:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=6d34e66cf77fdeea7f25cb13293dc7863bb2367984df7bc9347f55763e2b6f1b
PORT=5000
```

### Step 3: Get Your MongoDB Connection String

**If you haven't set up MongoDB yet:**
1. Follow `MONGODB_SETUP_GUIDE.md` (in the root folder)
2. Create MongoDB Atlas account
3. Get your connection string

**If you already have MongoDB:**
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database user credentials
6. Add `/tasktracker` before the `?` in the connection string

**Example:**
```
Original: mongodb+srv://cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
Modified: mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
```

### Step 4: Save the .env file

Make sure the file is saved as `.env` (not `.env.txt` or anything else)

---

## 🚀 Start the Server

Once your `.env` file is ready:

```bash
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
```

---

## 🧪 Test the Backend

After the server starts, in a new terminal:

```bash
node test-api.js
```

This will automatically test all endpoints!

---

## ❓ Need Help?

- MongoDB setup: See `MONGODB_SETUP_GUIDE.md`
- Testing: See `TESTING_GUIDE.md`
- Quick start: See `../QUICK_START.md`

