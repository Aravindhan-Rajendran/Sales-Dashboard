# Sales Dashboard – Deploy Steps (Start to End)

Follow these steps in order. Your code is already on GitHub.

---

## Part 1: Deploy the backend first (Render – free)

The frontend needs a live API URL. Deploy the backend so you get that URL.

### Step 1.1: Sign up / log in

1. Go to **https://render.com**
2. Click **Get Started** and sign in with **GitHub** (same account as your repo).

### Step 1.2: Create a new Web Service

1. Click **New +** (top right) → **Web Service**.
2. Under **Connect a repository**, find your **Sales Dashboard repo** and click **Connect**.
   - If you don’t see it, click **Configure account** and give Render access to that repo.

### Step 1.3: Configure the service

Use these settings exactly:

| Field | Value |
|--------|--------|
| **Name** | `sales-dashboard-api` (or any name you like) |
| **Region** | Choose closest to you (e.g. Oregon) |
| **Branch** | `main` |
| **Root Directory** | Click **Edit** and type: `backend` |
| **Runtime** | **Python 3** |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

### Step 1.4: Environment variable (CORS)

1. Scroll to **Environment Variables** → **Add Environment Variable**.
2. **Key:** `CORS_ORIGINS`
3. **Value:** Use **`*`** (a single asterisk) to allow your Vercel site (and any other) to call the API.  
   Or use your exact Vercel URL later, e.g. `https://sales-dashboard-ten-green.vercel.app`
4. Click **Create Web Service**.

### Step 1.5: Wait and copy backend URL

1. Render will build and deploy (2–5 minutes). Wait until status is **Live** (green).
2. At the top you’ll see a URL like: **https://sales-dashboard-api-xxxx.onrender.com**
3. **Copy this URL** and add `/api` at the end. Example:  
   `https://sales-dashboard-api-xxxx.onrender.com/api`  
   Save it somewhere – you’ll use it in Part 2.

---

## Part 2: Deploy the frontend (Vercel)

### Step 2.1: Sign up / log in

1. Go to **https://vercel.com**
2. Click **Sign Up** or **Log In** and choose **Continue with GitHub** (same account as your repo).

### Step 2.2: Import the project

1. Click **Add New…** → **Project**.
2. Find your **Sales Dashboard** repo in the list and click **Import** (next to it).

### Step 2.3: Configure the project

1. **Project Name:** Leave default or change (e.g. `sales-dashboard`).
2. **Root Directory:** Click **Edit**.
   - Select **frontend** (only the `frontend` folder).
   - Confirm so the root for the build is `frontend`.
3. **Framework Preset:** Should show **Vite**. If not, choose **Vite**.
4. **Build Command:** `npm run build` (default).
5. **Output Directory:** `dist` (default).
6. **Install Command:** `npm install` (default).

### Step 2.4: Add environment variable (backend URL)

1. Expand **Environment Variables**.
2. **Name:** `VITE_API_URL`
3. **Value:** Paste the backend URL you saved in Step 1.5, **with `/api`** at the end.  
   Example: `https://sales-dashboard-api-xxxx.onrender.com/api`
4. Leave **Production**, **Preview**, **Development** all checked (or at least **Production**).
5. Click **Deploy**.

### Step 2.5: Wait and get frontend URL

1. Vercel will build and deploy (1–2 minutes).
2. When it’s done you’ll see **Congratulations!** and a link like:  
   **https://sales-dashboard-xxxx.vercel.app**
3. **Copy this full URL** (no `/api`). You’ll use it in the next part.

---

## Part 3: Fix CORS (so the frontend can call the backend)

If you see “Failed to fetch” or “Something went wrong” on your Vercel site, the backend is blocking the request. Fix it on **Render**:

1. Go to **Render** → your backend service (e.g. **sales-dashboard-api**).
2. Open **Environment** (left sidebar).
3. Find **CORS_ORIGINS**:
   - **Easiest:** set **Value** to **`*`** (single asterisk). This allows any origin (your Vercel URL, preview URLs, etc.).
   - **Or** set it to your exact Vercel URL, e.g. `https://sales-dashboard-ten-green.vercel.app` (no trailing slash).
4. Click **Save Changes**. Render will **redeploy** (wait 1–2 minutes).
5. If the backend was sleeping (Render free tier), open your **Render service URL** in a new tab first to wake it, then refresh your Vercel dashboard.

---

## Part 4: Test the live dashboard

1. Open your **Vercel URL** in the browser (e.g. `https://sales-dashboard-xxxx.vercel.app`).
2. You should see:
   - KPI cards with numbers
   - Lead status table
   - Sales trend line chart
   - Lead distribution donut chart
   - Date range filter (Last 7 Days / Last 30 Days)

If you see “Something went wrong” or no data:

- Check that **VITE_API_URL** on Vercel is exactly: `https://your-render-url.onrender.com/api` (with `/api`).
- Check that **CORS_ORIGINS** on Render is exactly your Vercel URL (no trailing slash).
- On Vercel, go to **Deployments** → **⋯** on latest → **Redeploy** so the env var is applied.

---

## Quick reference

| Step | Where | What you did |
|------|--------|----------------|
| 1 | Render | Deploy backend from `backend` folder, get URL like `https://xxx.onrender.com` |
| 2 | Vercel | Deploy frontend from `frontend` folder, set `VITE_API_URL` = `https://xxx.onrender.com/api` |
| 3 | Render | Set `CORS_ORIGINS` = your Vercel URL (e.g. `https://xxx.vercel.app`) |
| 4 | Browser | Open Vercel URL and test dashboard |

---

## Optional: Update links later

- If you change the **Vercel** URL (e.g. new project name): update **CORS_ORIGINS** on Render and redeploy.
- If you change the **Render** URL: update **VITE_API_URL** on Vercel and redeploy the frontend.

That’s the full procedure from start to end.
