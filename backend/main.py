"""
FastAPI backend for Sales Dashboard.
Exposes aggregated KPIs, lead status counts, and sales trend data.
"""
import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from data import get_leads, get_sales, LEAD_STATUSES

app = FastAPI(title="Sales Dashboard API")

# CORS: set CORS_ORIGINS to your Vercel URL (e.g. https://sales-dashboard-ten-green.vercel.app)
# or set to * to allow any origin (no credentials).
_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_cors_origins = os.environ.get("CORS_ORIGINS", "").strip()
if _cors_origins:
    if _cors_origins == "*":
        _origins = ["*"]
        _credentials = False
    else:
        # Normalize: browser sends Origin without trailing slash, so strip it for match
        _origins.extend(o.strip().rstrip("/") for o in _cors_origins.split(",") if o.strip())
        _credentials = True
else:
    _credentials = True
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/dashboard")
def get_dashboard(days: int = Query(30, ge=7, le=30)):
    """
    Returns dashboard summary for the given date range.
    days: 7 or 30 (Last 7 Days / Last 30 Days).
    """
    if days != 7 and days != 30:
        days = 30
    leads = get_leads(days)
    sales = get_sales(days)

    # KPIs
    total_leads = len(leads)
    contacted = sum(1 for l in leads if l["status"] in ("Contacted", "Follow Up", "Appointment Booked", "Converted"))
    closed = sum(1 for l in leads if l["status"] == "Converted")
    total_revenue = sum(s["revenue"] for s in sales)

    # Lead status counts (all six statuses)
    status_counts = {s: sum(1 for l in leads if l["status"] == s) for s in LEAD_STATUSES}

    # Sales trend: aggregate revenue by date (last N days)
    from collections import defaultdict
    by_date = defaultdict(float)
    for s in sales:
        by_date[s["date"]] += s["revenue"]
    trend = [{"date": d, "revenue": round(r, 2)} for d, r in sorted(by_date.items())]

    # Lead distribution for pie chart
    distribution = [{"status": s, "count": status_counts[s]} for s in LEAD_STATUSES]

    return {
        "kpis": {
            "totalLeads": total_leads,
            "contactedLeads": contacted,
            "salesClosed": closed,
            "totalRevenue": round(total_revenue, 2),
        },
        "leadStatusSummary": [{"status": s, "count": status_counts[s]} for s in LEAD_STATUSES],
        "salesTrend": trend,
        "leadDistribution": distribution,
    }
