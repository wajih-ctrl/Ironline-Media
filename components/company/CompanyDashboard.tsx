'use client'

import { useAppStore } from '@/lib/store'
import { StatCard } from '@/components/ui/stat-card'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  FolderOpen, Sparkles, FileText, TrendingUp, CheckCircle, DollarSign, PlusCircle, ArrowRight, MapPin, Star, Clock, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CompanyDashboard() {
  const { companies, projects, providers, setCurrentPage, setActiveProjectId } = useAppStore()
  const company = companies.find((c) => c.id === 'c1')

  const myProjects = projects.filter((p) => p.companyId === 'c1')
  const active = myProjects.filter((p) => !['Completed'].includes(p.status))
  const proposals = myProjects.reduce((acc, p) => acc + p.proposals.length, 0)
  const matched = myProjects.reduce((acc, p) => acc + p.invitedProviders.length, 0)
  const inProgress = myProjects.filter((p) => p.status === 'In Progress').length
  const completed = myProjects.filter((p) => p.status === 'Completed').length

  const ACTIVITY = [
    { text: 'Permian Drone Visuals submitted a proposal on your ROW project', time: '2 hours ago', type: 'proposal' },
    { text: 'AI matched 3 providers for your pipeline project', time: '5 hours ago', type: 'match' },
    { text: 'West Texas Compression — your project was marked In Progress', time: '1 day ago', type: 'status' },
    { text: 'New provider available in Midland: Industrial Frame Studio', time: '2 days ago', type: 'provider' },
  ]

  const recommended = providers.filter((p) => p.approvalStatus === 'approved').slice(0, 3)

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Company workspace</p>
          <h1 className="text-3xl font-bold mt-2">Welcome back, {company?.name ?? 'Permian Flow Services'}</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-2xl">Post oilfield media requests, review AI-matched providers, compare bids, and keep awarded projects moving.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
        <Button variant="outline" className="self-start sm:self-auto" onClick={() => setCurrentPage('proposals')}>
          <FileText className="h-4 w-4 mr-2" />
          Compare Proposals
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 self-start sm:self-auto" onClick={() => setCurrentPage('post-project')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Post New Project
        </Button>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ['Latest request', myProjects[0]?.title ?? 'No requests yet'],
          ['Next deadline', myProjects[0]?.deadline ?? 'Not scheduled'],
          ['Marketplace status', `${matched} providers matched`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-muted/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
            <p className="mt-1 truncate text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Active Requests" value={active.length} icon={FolderOpen} iconColor="text-accent" onClick={() => setCurrentPage('projects')} />
        <StatCard title="Providers Matched" value={matched} icon={Sparkles} iconColor="text-primary" onClick={() => setCurrentPage('ai-matches')} />
        <StatCard title="Proposals Received" value={proposals} icon={FileText} iconColor="text-yellow-400" onClick={() => setCurrentPage('proposals')} />
        <StatCard title="In Progress" value={inProgress} icon={TrendingUp} iconColor="text-cyan-400" />
        <StatCard title="Completed" value={completed} icon={CheckCircle} iconColor="text-emerald-400" />
        <StatCard title="Est. Spend" value="$4,200" icon={DollarSign} iconColor="text-muted-foreground" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Active Projects</h2>
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage('projects')} className="text-xs text-muted-foreground">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border">
            {myProjects.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No projects yet.{' '}
                <button onClick={() => setCurrentPage('post-project')} className="text-accent hover:underline">
                  Post your first project
                </button>
              </div>
            ) : (
              myProjects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => { setActiveProjectId(project.id); setCurrentPage('projects') }}
                >
                  <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <FolderOpen className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm leading-tight truncate">{project.title}</p>
                      <StatusBadge status={project.status} className="shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{project.location}
                      </span>
                      <span>{project.budget}</span>
                      <span>{project.proposals.length} proposals</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="p-4">
                <div className="flex gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Providers */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold">Recommended Providers</h2>
          <Button variant="ghost" size="sm" onClick={() => setCurrentPage('ai-matches')} className="text-xs text-muted-foreground">
            View AI Matches <Sparkles className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {recommended.map((provider) => (
            <div key={provider.id} className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
                  {provider.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{provider.name}</p>
                  <p className="text-xs text-muted-foreground">{provider.serviceCategory}</p>
                </div>
                {provider.featured && (
                  <div className="shrink-0 ml-auto">
                    <Zap className="h-3.5 w-3.5 text-accent" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                {provider.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviewCount})</span>
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  {provider.matchScore}% match
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 text-xs border-border/60 hover:border-accent/40 hover:text-accent"
                onClick={() => setCurrentPage('ai-matches')}
              >
                Invite to Bid
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
