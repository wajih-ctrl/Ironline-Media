'use client'

import { useAppStore } from '@/lib/store'
import { StatCard } from '@/components/ui/stat-card'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Users, Building2, FolderOpen, AlertTriangle, TrendingUp, DollarSign, Clock, CheckCircle, FileText,
  ChevronRight, Activity, Star, Shield,
} from 'lucide-react'

export default function AdminDashboard() {
  const { companies, providers, projects } = useAppStore()

  const pendingApprovals = providers.filter((p) => p.approvalStatus === 'pending').length
  const activeProjects = projects.filter((p) => !['Completed', 'Delivered'].includes(p.status)).length
  const proProviders = providers.filter((p) => p.subscriptionPlan === 'pro').length
  const mrr = providers.filter((p) => p.subscriptionPlan === 'pro').length * 100 + providers.filter((p) => p.subscriptionPlan === 'basic').length * 50
  const proposalsSubmitted = projects.reduce((sum, project) => sum + project.proposals.length, 0)
  const matchedProviders = projects.reduce((sum, project) => sum + project.invitedProviders.length, 0)
  const activeSubscriptions = providers.filter((p) => p.subscriptionStatus === 'active' || p.subscriptionStatus === 'trial').length
  const completedProjects = projects.filter((p) => p.status === 'Completed').length

  const recentActivity = [
    { id: 1, type: 'approval', text: 'Apex Drone Solutions requested provider approval', time: '12 min ago', icon: Shield, color: 'text-accent' },
    { id: 2, type: 'project', text: 'Basin Valve & Control posted a new project', time: '28 min ago', icon: FolderOpen, color: 'text-primary' },
    { id: 3, type: 'subscription', text: 'Red Rock Midstream upgraded to Pro', time: '1 hr ago', icon: Star, color: 'text-yellow-400' },
    { id: 4, type: 'flag', text: 'Dispute flagged on Project #PRJ-009', time: '2 hr ago', icon: AlertTriangle, color: 'text-destructive' },
    { id: 5, type: 'user', text: 'New company registered: Midland Energy Fab', time: '3 hr ago', icon: Building2, color: 'text-primary' },
    { id: 6, type: 'subscription', text: 'Permian Drone Visuals renewed Pro subscription', time: '5 hr ago', icon: DollarSign, color: 'text-emerald-400' },
  ]

  const topProviders = providers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  const recentProjects = projects.slice(0, 5)

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Ironline admin portal</p>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Marketplace Operations</h1>
            <p className="text-muted-foreground text-sm mt-2 max-w-2xl">Monitor companies, providers, project requests, subscriptions, approvals, and platform activity from one workspace.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="rounded-xl bg-muted/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">MRR</p>
              <p className="text-xl font-bold">${mrr.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-muted/60 px-4 py-3">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-xl font-bold">{pendingApprovals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Providers"
          value={providers.length}
          icon={Users}
          trend="+3 this month"
          trendUp
        />
        <StatCard
          title="Companies"
          value={companies.length}
          icon={Building2}
          trend="+2 this month"
          trendUp
        />
        <StatCard
          title="Active Projects"
          value={activeProjects}
          icon={FolderOpen}
          trend={`${projects.length} total`}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals}
          icon={AlertTriangle}
          trend="Needs review"
          alert={pendingApprovals > 0}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Proposals Submitted"
          value={proposalsSubmitted}
          icon={FileText}
          trend="All bids"
        />
        <StatCard
          title="Matched Providers"
          value={matchedProviders}
          icon={Activity}
          trend="Invited to bid"
        />
        <StatCard
          title="Active Subscriptions"
          value={activeSubscriptions}
          icon={Star}
          trend={`$${mrr.toLocaleString()} MRR`}
        />
        <StatCard
          title="Completed Projects"
          value={completedProjects}
          icon={CheckCircle}
          trend="Delivered work"
          trendUp
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Recurring Revenue"
          value={`$${mrr.toLocaleString()}`}
          icon={TrendingUp}
          trend="+12% vs last month"
          trendUp
        />
        <StatCard
          title="Pro Subscribers"
          value={proProviders}
          icon={Star}
          trend={`of ${providers.length} providers`}
        />
        <StatCard
          title="Avg Match Score"
          value="87%"
          icon={Activity}
          trend="AI accuracy"
        />
        <StatCard
          title="Completion Rate"
          value="94%"
          icon={CheckCircle}
          trend="Projects completed"
          trendUp
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Recent Activity</h2>
            <span className="text-xs text-muted-foreground">Last 24 hours</span>
          </div>
          <div className="divide-y divide-border/40">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className={`mt-0.5 shrink-0 ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" />{item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Providers */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Top Rated Providers</h2>
            <span className="text-xs text-muted-foreground">By rating</span>
          </div>
          <div className="divide-y divide-border/40">
            {topProviders.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.serviceCategory}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400" />{p.rating}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.subscriptionPlan === 'pro' ? 'bg-accent/15 text-accent' :
                    p.subscriptionPlan === 'basic' ? 'bg-primary/15 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {p.subscriptionPlan === 'none' ? 'Free' : p.subscriptionPlan}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Recent Projects</h2>
          <button className="text-xs text-primary flex items-center gap-0.5 hover:underline">
            View all <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Project</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Company</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Budget</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-3 font-medium max-w-[200px] truncate">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.companyName}</td>
                  <td className="px-4 py-3 text-accent font-medium">{p.budget}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{p.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
