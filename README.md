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

## Screenshots

After running the app, capture screens of the dashboard for submission (KPI section, table, charts, and date filter).

## License

MIT (or as required by your assignment).
