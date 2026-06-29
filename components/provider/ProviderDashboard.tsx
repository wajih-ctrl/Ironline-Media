'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/ui/stat-card'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Briefcase, DollarSign, Star, TrendingUp, ArrowRight, MapPin, Clock, Zap,
  CheckCircle, AlertCircle, ChevronRight, Calendar,
} from 'lucide-react'

const ACTIVITY = [
  { text: 'New matched project: Pipeline Campaign Video, Odessa TX — $4,500 budget', time: '1 hour ago', type: 'match' },
  { text: 'Proposal submitted on: Drone ROW Inspection — awaiting decision', time: '3 hours ago', type: 'proposal' },
  { text: 'Your Pro subscription renews in 16 days', time: '1 day ago', type: 'billing' },
  { text: 'Project workspace opened: Permian Flow Services ROW project', time: '2 days ago', type: 'project' },
]

export default function ProviderDashboard() {
  const { projects, providers, setCurrentPage, setActiveProjectId } = useAppStore()
  const provider = providers.find((p) => p.id === 'p1')

  const myProjects = projects.filter(
    (p) => p.invitedProviders.includes('p1') || p.selectedProviderId === 'p1'
  )
  const awarded = myProjects.filter((p) => p.selectedProviderId === 'p1')
  const active = myProjects.filter((p) => p.status === 'In Progress')
  const totalEarned = awarded.reduce((sum, p) => {
    const prop = p.proposals.find((pr) => pr.providerId === 'p1' && pr.status === 'selected')
    return sum + (prop?.price ?? 0)
  }, 0)

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Provider command center</p>
          <h1 className="text-3xl font-bold mt-2">Welcome back, Permian Drone Visuals</h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-2xl">Track matched opportunities, submit proposals, manage subscriptions, and keep awarded industrial media projects on schedule.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
        <Button
          variant="outline"
          className="self-start sm:self-auto"
          onClick={() => setCurrentPage('subscription')}
        >
          <Zap className="h-4 w-4 mr-2" />
          Manage Plan
        </Button>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 self-start sm:self-auto"
          onClick={() => setCurrentPage('opportunities')}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          View Opportunities
        </Button>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ['Current plan', provider?.subscriptionPlan === 'none' ? 'Free' : `${provider?.subscriptionPlan} plan`],
          ['Profile strength', `${provider?.portfolioStrength ?? 95}%`],
          ['Opportunity value', `$${(provider?.monthlyOpportunityValue ?? 8400).toLocaleString()}/mo`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-muted/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
            <p className="mt-1 capitalize text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
      </div>

      {/* Subscription notice */}
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center">
            <Zap className="h-4 w-4 text-accent" />
          </div>
          <div>
            <div className="text-sm font-semibold capitalize">
              {provider?.subscriptionPlan === 'none' ? 'Free Plan' : `${provider?.subscriptionPlan} Plan`} - {provider?.subscriptionStatus}
            </div>
            <div className="text-xs text-muted-foreground">
              {provider?.subscriptionRenewal ? `Renews ${provider.subscriptionRenewal} - ` : ''}
              {provider?.subscriptionPlan === 'pro'
                ? 'Unlimited proposals - Featured listing'
                : provider?.subscriptionPlan === 'basic'
                ? 'Matched opportunities - 5 proposals/month'
                : 'Subscribe to unlock proposals'}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 text-xs border-accent/30 text-accent hover:bg-accent/10"
          onClick={() => setCurrentPage('subscription')}
        >
          Manage Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Projects Invited" value={myProjects.length} icon={Briefcase} iconColor="text-primary" onClick={() => setCurrentPage('opportunities')} />
        <StatCard title="Awarded Projects" value={awarded.length} icon={CheckCircle} iconColor="text-emerald-400" onClick={() => setCurrentPage('provider-projects')} />
        <StatCard title="Active Projects" value={active.length} icon={TrendingUp} iconColor="text-accent" onClick={() => setCurrentPage('provider-projects')} />
        <StatCard title="Total Earned" value={`$${totalEarned.toLocaleString()}`} icon={DollarSign} iconColor="text-yellow-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Matched Opportunities */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Matched Opportunities</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setCurrentPage('opportunities')}>
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border">
            {myProjects.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No matched opportunities yet.{' '}
                <button onClick={() => setCurrentPage('subscription')} className="text-accent hover:underline">
                  Upgrade your plan
                </button>{' '}
                for more visibility.
              </div>
            ) : (
              myProjects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => { setActiveProjectId(p.id); setCurrentPage('provider-projects') }}
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm leading-tight truncate">{p.title}</p>
                      <StatusBadge status={p.status} className="shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                      <span>{p.budget}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {p.deadline}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity + Profile Strength */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-sm">Profile Strength</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">95%</span>
                <span className="text-xs text-emerald-400">Excellent</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }} />
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Portfolio uploaded', done: true },
                  { label: 'Bio written', done: true },
                  { label: 'Equipment listed', done: true },
                  { label: 'O&G experience verified', done: true },
                  { label: '5+ reviews', done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    {item.done
                      ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      : <AlertCircle className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                    }
                    <span className={item.done ? 'text-muted-foreground' : 'text-muted-foreground/50'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 text-xs"
                onClick={() => setCurrentPage('provider-profile')}
              >
                Edit Profile <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-sm">Recent Activity</h2>
            </div>
            <div className="divide-y divide-border/50">
              {ACTIVITY.slice(0, 3).map((item, i) => (
                <div key={i} className="p-3">
                  <div className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />{item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Earnings overview */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-semibold mb-4">Earnings Overview</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: 'This Month', value: '$2,200', change: '+18%' },
            { label: 'Last Month', value: '$1,900', change: '+6%' },
            { label: 'This Quarter', value: '$6,100', change: '+24%' },
            { label: 'Avg per Project', value: '$2,050', change: '' },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border/50 bg-muted/20 p-4">
              <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
              <div className="text-xl font-bold">{item.value}</div>
              {item.change && (
                <div className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {item.change}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
