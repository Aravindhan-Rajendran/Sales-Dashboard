export default function DateRangeFilter({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="date-range" className="text-sm font-medium text-slate-600">
        Date range
      </label>
      <select
        id="date-range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value={7}>Last 7 Days</option>
        <option value={30}>Last 30 Days</option>
      </select>
    </div>
  )
}
