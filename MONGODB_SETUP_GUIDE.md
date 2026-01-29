# MongoDB Setup Guide - Step by Step

## 🎯 Quick Overview

We'll use **MongoDB Atlas** (free cloud database) - no installation needed!

---

## 📝 Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (it's free!)
3. Verify your email address

---

## 🏗️ Step 2: Create a Cluster

1. After logging in, click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Click **"Create"** (takes 1-3 minutes)

---

## 🔐 Step 3: Create Database User

1. In the **Security** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username:** `tasktracker` (or any username you like)
   - **Password:** Click "Autogenerate Secure Password" (SAVE THIS PASSWORD!)
5. Under **"Database User Privileges"**, select **"Read and write to any database"**
6. Click **"Add User"**

**⚠️ IMPORTANT:** Save your username and password - you'll need them!

---

## 🌐 Step 4: Whitelist Your IP Address

1. In the **Security** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your current IP address
4. Click **"Confirm"**

---

## 🔗 Step 5: Get Your Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string (looks like this):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## ✏️ Step 6: Create Your .env File

1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add database name: Change `?` to `/tasktracker?`

**Final connection string should look like:**
```
mongodb+srv://tasktracker:yourpassword@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
```

---

## 🎯 Step 7: Generate JWT Secret

We need a secure random string for JWT tokens. You can:

**Option 1: Use Node.js (recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Use an online generator**
- Go to: https://randomkeygen.com/
- Use a "CodeIgniter Encryption Keys" (256-bit)

---

## 📄 Step 8: Create .env File

Create a file named `.env` in the `backend` folder with:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=your_generated_jwt_secret_here
PORT=5000
```

**⚠️ Replace:**
- `your_username` with your MongoDB username
- `your_password` with your MongoDB password
- `cluster0.xxxxx` with your actual cluster address
- `your_generated_jwt_secret_here` with the secret you generated

---

## ✅ You're Ready!

Now you can start the backend server and test it!

