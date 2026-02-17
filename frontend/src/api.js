const API_BASE = '/api';

export async function fetchDashboard(days = 30) {
  const res = await fetch(`${API_BASE}/dashboard?days=${days}`);
  if (!res.ok) throw new Error('Failed to load dashboard');
  return res.json();
}
