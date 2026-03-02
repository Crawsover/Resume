# 🚀 Backend Deployment Guide

## Option 1: Railway (Recommended - Easiest)

### Step 1: Sign up for Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Connect your GitHub account

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: **`Crawsover/Resume`**
4. Railway will auto-detect the backend

### Step 3: Configure Service
1. Click on the deployed service
2. Go to **Settings** → **Root Directory**
3. Set to: `backend`
4. Click **"Redeploy"**

### Step 4: Add Environment Variables
Go to **Variables** tab and add:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=portfolio_db
PORT=8001
```

**Need a MongoDB?** Use Railway's MongoDB plugin:
- In your project, click **"New"** → **"Database"** → **"MongoDB"**
- Railway will auto-generate `MONGO_URL`

### Step 5: Get Your Backend URL
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL (e.g., `https://resume-production-xxxx.up.railway.app`)

### Step 6: Update Frontend
Update your frontend's backend URL and redeploy:

```bash
# On your local machine
cd frontend
echo "REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app" > .env.production
yarn build
cd build
git add -A
git commit -m "Update backend URL"
git push origin gh-pages
```

---

## Option 2: Render

### Step 1: Sign up for Render
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repo: **`Crawsover/Resume`**
3. Configure:
   - **Name:** `jeremy-crawford-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free (or paid)

### Step 3: Add Environment Variables
Add these in the **Environment** tab:

```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=portfolio_db
PYTHON_VERSION=3.11.0
```

### Step 4: Deploy
Click **"Create Web Service"** - Render will deploy automatically

### Step 5: Get Your URL
Your backend will be live at: `https://jeremy-crawford-api.onrender.com`

---

## Option 3: Vercel (Serverless)

### Prerequisites
Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy
```bash
cd backend
vercel --prod
```

Follow the prompts to deploy.

---

## 🗄️ MongoDB Setup (Required)

### Option 1: MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

### Option 2: Railway MongoDB
1. In your Railway project
2. Click **"New"** → **"Database"** → **"MongoDB"**
3. `MONGO_URL` will be auto-generated

---

## ✅ Verify Deployment

Test your backend:
```bash
curl https://your-backend-url.com/api/
# Should return: {"message": "Hello World"}

curl https://your-backend-url.com/api/system-builder/templates
# Should return: JSON array of templates
```

---

## 🔧 Troubleshooting

### Backend not starting?
- Check logs in Railway/Render dashboard
- Verify `MONGO_URL` is correct
- Ensure all environment variables are set

### CORS errors?
The backend is already configured to allow all origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

### MongoDB connection failed?
- Check your IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Test connection string in MongoDB Compass

---

## 📊 What You'll Have:

✅ **Frontend:** https://crawsover.github.io/Resume/
✅ **Backend:** https://your-backend.railway.app/
✅ **Database:** MongoDB Atlas or Railway MongoDB

**Your full-stack portfolio will be live!** 🎉
