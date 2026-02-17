export default function LeadStatusTable({ items }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Lead Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Count
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.map(({ status, count }) => (
            <tr key={status} className="hover:bg-slate-50/50">
              <td className="px-6 py-4 text-sm font-medium text-slate-800">{status}</td>
              <td className="px-6 py-4 text-sm text-slate-600 text-right tabular-nums">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
