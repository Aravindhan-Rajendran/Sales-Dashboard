"""
Seed data and in-memory store for leads and sales.
Generates realistic dummy data for the dashboard.
"""
from datetime import datetime, timedelta
from typing import List
import random

# Lead statuses as per PRD
LEAD_STATUSES = ["New", "Contacted", "Follow Up", "Appointment Booked", "Converted", "Lost"]

def _random_date_in_range(days_back: int) -> datetime:
    """Return a random datetime within the last days_back days."""
    now = datetime.utcnow()
    start = now - timedelta(days=days_back)
    delta = now - start
    return start + timedelta(seconds=random.randint(0, int(delta.total_seconds())))

def generate_leads(count: int = 120, days_span: int = 45) -> List[dict]:
    """Generate leads with created_at and status."""
    leads = []
    status_weights = [20, 25, 18, 12, 10, 15]  # New, Contacted, Follow Up, Appointment Booked, Converted, Lost
    for i in range(count):
        status = random.choices(LEAD_STATUSES, weights=status_weights, k=1)[0]
        leads.append({
            "id": str(i + 1),
            "status": status,
            "created_at": _random_date_in_range(days_span).isoformat() + "Z",
        })
    return leads

def generate_sales(leads: List[dict], count: int = 50) -> List[dict]:
    """Generate sales from a subset of leads (Converted). Revenue and date."""
    converted = [l for l in leads if l["status"] == "Converted"]
    # If we have fewer converted than count, create extra sales on random dates
    sales = []
    for i in range(count):
        if i < len(converted):
            lead = converted[i]
            dt = datetime.fromisoformat(lead["created_at"].replace("Z", ""))
        else:
            dt = _random_date_in_range(45)
        revenue = round(random.uniform(500, 8500), 2)
        sales.append({
            "id": str(i + 1),
            "date": dt.date().isoformat(),
            "revenue": revenue,
        })
    return sales

# In-memory data (generated once)
_all_leads = generate_leads(120, 45)
_all_sales = generate_sales(_all_leads, 55)

def get_leads(days: int = 30) -> List[dict]:
    """Return leads created within the last `days` days."""
    cutoff = datetime.utcnow() - timedelta(days=days)
    return [
        l for l in _all_leads
        if datetime.fromisoformat(l["created_at"].replace("Z", "")) >= cutoff
    ]

def get_sales(days: int = 30) -> List[dict]:
    """Return sales within the last `days` days (by date)."""
    cutoff = (datetime.utcnow() - timedelta(days=days)).date()
    return [s for s in _all_sales if datetime.fromisoformat(s["date"]).date() >= cutoff]
