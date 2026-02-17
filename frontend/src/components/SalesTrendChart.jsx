import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function formatDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function SalesTrendChart({ data }) {
  const chartData = (data || []).map(({ date, revenue }) => ({
    date: formatDate(date),
    revenue,
    fullDate: date,
  }))

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        No sales data in this range
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748b" />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} stroke="#64748b" />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Revenue']}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate && formatDate(payload[0].payload.fullDate)}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
