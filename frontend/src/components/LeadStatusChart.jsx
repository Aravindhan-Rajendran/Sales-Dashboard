import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#6366f1', '#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']

export default function LeadStatusChart({ data }) {
  const chartData = (data || []).map(({ status, count }) => ({ name: status, value: count }))

  if (chartData.length === 0 || chartData.every((d) => d.value === 0)) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        No lead data in this range
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [value, 'Count']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: 12 }}
            formatter={(value, entry) => {
              const item = chartData.find((d) => d.name === value)
              const total = chartData.reduce((s, d) => s + d.value, 0)
              const pct = total ? ((item?.value ?? 0) / total * 100).toFixed(0) : 0
              return `${value} (${pct}%)`
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
