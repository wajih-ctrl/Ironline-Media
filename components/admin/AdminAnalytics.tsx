'use client'

import { useAppStore } from '@/lib/store'
import {
  TrendingUp, Users, FolderOpen, DollarSign, Activity, Star,
  ArrowUpRight, ArrowDownRight, BarChart3, Target,
} from 'lucide-react'

function MiniBar({ value, max, color = 'bg-primary' }: { value: number; max: number; color?: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function AdminAnalytics() {
  const { providers, companies, projects } = useAppStore()

  // Derived stats
  const completedProjects = projects.filter((p) => p.status === 'Completed').length
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress').length
  const newProjects = projects.filter((p) => p.status === 'New').length
  const avgMatchScore = Math.round(
    providers.reduce((sum, p) => sum + (p.matchScore ?? 87), 0) / providers.length
  )

  // Category breakdown
  const categoryMap: Record<string, number> = {}
  projects.forEach((p) => {
    categoryMap[p.serviceType] = (categoryMap[p.serviceType] ?? 0) + 1
  })
  const categories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
  const maxCatCount = Math.max(...categories.map((c) => c[1]))

  // Provider service breakdown
  const providerServiceMap: Record<string, number> = {}
  providers.forEach((p) => {
    providerServiceMap[p.serviceCategory] = (providerServiceMap[p.serviceCategory] ?? 0) + 1
  })
  const providerServices = Object.entries(providerServiceMap).sort((a, b) => b[1] - a[1])
  const maxServiceCount = Math.max(...providerServices.map((s) => s[1]))

  // Fake monthly trend data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const projectTrend = [3, 5, 4, 7, 6, projects.length]
  const providerTrend = [4, 6, 7, 9, 10, providers.length]
  const revenueMonths = [600, 850, 1050, 1250, 1400, (providers.filter((p) => p.subscriptionPlan === 'pro').length * 100 + providers.filter((p) => p.subscriptionPlan === 'basic').length * 50)]
  const maxRevenue = Math.max(...revenueMonths)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Key metrics and trends for Ironline Media</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: projects.length, sub: `${completedProjects} completed`, icon: FolderOpen, trend: '+23%', up: true, color: 'text-primary' },
          { label: 'Active Providers', value: providers.filter((p) => p.approvalStatus === 'approved').length, sub: `of ${providers.length} registered`, icon: Users, trend: '+15%', up: true, color: 'text-accent' },
          { label: 'Avg Match Score', value: `${avgMatchScore}%`, sub: 'AI accuracy', icon: Target, trend: '+2%', up: true, color: 'text-emerald-400' },
          { label: 'Completion Rate', value: `${Math.round((completedProjects / Math.max(projects.length, 1)) * 100)}%`, sub: `${completedProjects} of ${projects.length}`, icon: Activity, trend: '+5%', up: true, color: 'text-yellow-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              <span className={`text-xs flex items-center gap-0.5 ${kpi.up ? 'text-emerald-400' : 'text-destructive'}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.trend}
              </span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue trend */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign className="h-4 w-4 text-accent" />
            <h2 className="font-semibold text-sm">Monthly Revenue (MRR)</h2>
          </div>
          <div className="flex items-end gap-2 h-32">
            {revenueMonths.map((v, i) => {
              const h = Math.round((v / maxRevenue) * 100)
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div
                      className="w-full rounded-t bg-accent/70 hover:bg-accent transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{months[i]}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Current MRR</span>
            <span className="font-bold text-accent">${revenueMonths[revenueMonths.length - 1].toLocaleString()}</span>
          </div>
        </div>

        {/* Project + Provider Growth */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-sm">Growth Trends</h2>
          </div>
          <div className="flex items-end gap-2 h-32">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '100px' }}>
                  <div
                    className="w-full rounded-sm bg-primary/60 hover:bg-primary/80 transition-colors"
                    style={{ height: `${Math.round((providerTrend[i] / Math.max(...providerTrend)) * 50)}%` }}
                    title={`Providers: ${providerTrend[i]}`}
                  />
                  <div
                    className="w-full rounded-sm bg-accent/60 hover:bg-accent/80 transition-colors"
                    style={{ height: `${Math.round((projectTrend[i] / Math.max(...projectTrend)) * 50)}%` }}
                    title={`Projects: ${projectTrend[i]}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary/60" />Providers</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-accent/60" />Projects</span>
          </div>
        </div>
      </div>

      {/* Category Breakdowns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Project service types */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-sm">Projects by Service Type</h2>
          </div>
          <div className="space-y-3">
            {categories.map(([name, count]) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-foreground/80 truncate max-w-[70%]">{name}</span>
                  <span className="font-semibold text-primary">{count}</span>
                </div>
                <MiniBar value={count} max={maxCatCount} color="bg-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Provider service categories */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <Star className="h-4 w-4 text-accent" />
            <h2 className="font-semibold text-sm">Providers by Category</h2>
          </div>
          <div className="space-y-3">
            {providerServices.map(([name, count]) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-foreground/80 truncate max-w-[70%]">{name}</span>
                  <span className="font-semibold text-accent">{count}</span>
                </div>
                <MiniBar value={count} max={maxServiceCount} color="bg-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project status funnel */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm">Project Status Funnel</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {(['New', 'Matched', 'Proposal Received', 'Awarded', 'In Progress', 'Delivered', 'Completed'] as const).map((status) => {
            const count = projects.filter((p) => p.status === status).length
            return (
              <div key={status} className="text-center">
                <p className="text-xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{status}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
