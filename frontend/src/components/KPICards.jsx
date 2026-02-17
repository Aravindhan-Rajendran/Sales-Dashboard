const cards = [
  { key: 'totalLeads', label: 'Total Leads', color: 'indigo' },
  { key: 'contactedLeads', label: 'Contacted Leads', color: 'sky' },
  { key: 'salesClosed', label: 'Sales Closed', color: 'emerald' },
  { key: 'totalRevenue', label: 'Total Revenue', color: 'amber' },
]

const colorClasses = {
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-700',
  sky: 'bg-sky-50 border-sky-100 text-sky-700',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  amber: 'bg-amber-50 border-amber-100 text-amber-800',
}

function formatRevenue(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

export default function KPICards({ kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, color }) => (
        <div
          key={key}
          className={`rounded-xl border p-5 ${colorClasses[color]}`}
        >
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums">
            {key === 'totalRevenue' ? formatRevenue(kpis[key]) : kpis[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
