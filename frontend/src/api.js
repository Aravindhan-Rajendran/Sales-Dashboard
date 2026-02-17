// In dev: use Vite proxy (/api). In production: set VITE_API_URL to your backend URL.
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchDashboard(days = 30) {
  const url = API_BASE ? `${API_BASE}/dashboard?days=${days}` : `/api/dashboard?days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load dashboard');
  return res.json();
}
