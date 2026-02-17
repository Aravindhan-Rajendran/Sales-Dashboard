# Full Stack Sales Dashboard

A full-stack sales dashboard for internal business monitoring: **React** frontend and **Python (FastAPI)** backend.

## Features

- **KPI cards**: Total Leads, Contacted Leads, Sales Closed, Total Revenue
- **Lead status summary**: Table with all six statuses (New, Contacted, Follow Up, Appointment Booked, Converted, Lost) and counts
- **Sales trend**: Line chart (Date vs Revenue) with at least 7 days of data
- **Lead distribution**: Donut chart with tooltips and percentages
- **Date range filter**: Last 7 Days / Last 30 Days (dropdown)
- Loading state, empty state, and clean responsive layout (min 1366×768)

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts |
| Backend  | Python 3, FastAPI |
| Data     | In-memory (dummy seed data) |

## Setup

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.9+

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API runs at **http://127.0.0.1:8000**. Docs: http://127.0.0.1:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173**. It proxies `/api` to the backend.

### Run both

1. Start the backend (terminal 1): `cd backend && venv\Scripts\activate && uvicorn main:app --reload --port 8000`
2. Start the frontend (terminal 2): `cd frontend && npm run dev`
3. Open http://localhost:5173

## Architecture & Design

- **Backend**: Single FastAPI app. `data.py` holds in-memory lead/sales seed data and filtering by `days`. `GET /api/dashboard?days=7|30` returns KPIs, lead status summary, sales trend (aggregated by date), and lead distribution. CORS is enabled for the Vite dev origin.
- **Frontend**: Vite + React. One dashboard page that fetches `/api/dashboard?days=...` and passes data to presentational components (KPICards, LeadStatusTable, SalesTrendChart, LeadStatusChart). Date range is controlled by a dropdown; changing it refetches with the new `days` value.
- **Data**: Dummy data is generated once at import (120 leads, 55 sales over ~45 days) so both 7-day and 30-day filters show meaningful numbers. No database required for the assignment.

## Project Structure

```
backend/
  main.py           # FastAPI app, /api/dashboard, CORS
  data.py           # Seed data, get_leads(days), get_sales(days)
  requirements.txt
frontend/
  src/
    api.js          # fetchDashboard(days)
    App.jsx
    pages/Dashboard.jsx
    components/
      DateRangeFilter.jsx
      KPICards.jsx
      LeadStatusTable.jsx
      SalesTrendChart.jsx
      LeadStatusChart.jsx
  index.html, vite.config.js, tailwind.config.js, ...
README.md
```

---

## GitHub & Deploy (Vercel)

### 1. Push to GitHub

From the project root (`d:\New folder (4)` or wherever the repo lives):

```bash
git init
git add .
git commit -m "Initial commit: Sales Dashboard (React + FastAPI)"
```

Create a new repository on [GitHub](https://github.com/new) (do **not** add a README or .gitignore there). Then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

### 2. Deploy frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New** → **Project** and import your GitHub repo.
3. **Root Directory**: set to `frontend` (so Vercel builds the React app).
4. **Build settings** (usually auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. **Environment variables** (optional for a live backend):
   - Name: `VITE_API_URL`  
   - Value: your backend URL + `/api`, e.g. `https://your-backend.onrender.com/api`  
   (If you leave this empty, the dashboard will load but API calls will fail until you deploy the backend.)
6. Click **Deploy**. Vercel will give you a URL like `https://your-project.vercel.app`.

### 3. Deploy backend (so the live dashboard has data)

Vercel hosts the frontend only. To have a working live dashboard, deploy the backend somewhere that runs Python (e.g. **Render** or **Railway**).

**Option A – Render (free tier)**

1. Go to [render.com](https://render.com) and sign in with GitHub.
2. **New** → **Web Service**, connect your repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment**: add `CORS_ORIGINS` = your Vercel URL (e.g. `https://your-project.vercel.app`).
5. Deploy. Copy the service URL (e.g. `https://your-app.onrender.com`).

Then in **Vercel** (frontend project) → **Settings** → **Environment Variables**, set:

- `VITE_API_URL` = `https://your-app.onrender.com/api`  
Redeploy the frontend so it uses this URL.

**Option B – Railway**

1. Go to [railway.app](https://railway.app), sign in with GitHub, **New Project** → **Deploy from GitHub** and select your repo.
2. Set **Root Directory** to `backend`, add a start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
3. In **Variables**, add `CORS_ORIGINS` = your Vercel URL.
4. After deploy, copy the public URL and set `VITE_API_URL` in Vercel to `https://your-app.railway.app/api`, then redeploy the frontend.

### Summary

| What        | Where   | URL / env                          |
|------------|---------|-------------------------------------|
| Frontend   | Vercel  | e.g. `https://your-project.vercel.app` |
| Backend    | Render / Railway | e.g. `https://your-app.onrender.com` |
| Frontend env | Vercel → `VITE_API_URL` | `https://your-backend-url/api` |
| Backend env  | Render / Railway → `CORS_ORIGINS` | Your Vercel frontend URL |

---

## Screenshots

After running the app, capture screens of the dashboard for submission (KPI section, table, charts, and date filter).

## License

MIT (or as required by your assignment).
