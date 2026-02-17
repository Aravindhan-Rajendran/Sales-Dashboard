import { useState, useEffect } from 'react'
import { fetchDashboard } from '../api'
import DateRangeFilter from '../components/DateRangeFilter'
import KPICards from '../components/KPICards'
import LeadStatusTable from '../components/LeadStatusTable'
import SalesTrendChart from '../components/SalesTrendChart'
import LeadStatusChart from '../components/LeadStatusChart'

export default function Dashboard() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchDashboard(days)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [days])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <p className="text-red-700 font-medium">Something went wrong</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <p className="text-slate-500 text-xs mt-3">Ensure the backend is running on port 8000.</p>
        </div>
      </div>
    )
  }

  const hasData = data && (data.kpis.totalLeads > 0 || data.salesTrend?.length > 0)

  if (!hasData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Sales Dashboard</h1>
          <DateRangeFilter value={days} onChange={setDays} />
        </header>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="font-medium">No data available</p>
          <p className="text-sm mt-1">There are no leads or sales in the selected date range.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pb-12">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Sales Dashboard</h1>
        <DateRangeFilter value={days} onChange={setDays} />
      </header>

      <section className="mb-8">
        <KPICards kpis={data.kpis} />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Lead Status Summary</h2>
        <LeadStatusTable items={data.leadStatusSummary} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Sales Trend</h2>
          <SalesTrendChart data={data.salesTrend} />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Lead Status Distribution</h2>
          <LeadStatusChart data={data.leadDistribution} />
        </div>
      </section>
    </div>
  )
}
