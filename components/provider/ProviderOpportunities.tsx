'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Briefcase, MapPin, DollarSign, Calendar, Clock, ArrowRight, Filter, Search,
  Zap, AlertCircle,
} from 'lucide-react'

const SERVICE_FILTERS = ['All', 'Drone Footage', 'Videography', 'Photography', 'Graphic Design', 'Social Media Content', 'Event Coverage']

export default function ProviderOpportunities() {
  const { projects, setCurrentPage, setActiveProjectId, addInvite } = useAppStore()
  const [serviceFilter, setServiceFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'budget'>('newest')
  const [page, setPage] = useState(1)

  const openProjects = projects.filter(
    (p) => ['New', 'Matched'].includes(p.status)
  )

  const filtered = openProjects.filter((p) => {
    const matchService = serviceFilter === 'All' || p.serviceType.includes(serviceFilter)
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    return matchService && matchSearch
  }).sort((a, b) => {
    if (sortBy === 'deadline') return a.deadline.localeCompare(b.deadline)
    if (sortBy === 'budget') return Number(b.budget.replace(/[^0-9]/g, '')) - Number(a.budget.replace(/[^0-9]/g, ''))
    return b.createdAt.localeCompare(a.createdAt)
  })
  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Matched Opportunities</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Projects matched to your service category and location</p>
      </div>

      {/* Subscription Notice */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium">You&apos;re on the Pro Plan</p>
          <p className="text-xs text-muted-foreground mt-0.5">You have access to all matched opportunities and unlimited proposals.</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs shrink-0 text-primary"
          onClick={() => setCurrentPage('subscription')}
        >
          View Plan
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or locations..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-wrap gap-1.5">
            {SERVICE_FILTERS.slice(0, 4).map((f) => (
              <button
                key={f}
                onClick={() => { setServiceFilter(f); setPage(1) }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  serviceFilter === f
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-muted/30 text-muted-foreground border border-border hover:border-muted-foreground/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setPage(1) }}
          className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
        >
          <option value="newest">Newest first</option>
          <option value="deadline">Deadline soonest</option>
          <option value="budget">Highest budget</option>
        </select>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{filtered.length} opportunities available</p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold mb-1">No matching opportunities</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or check back soon.</p>
          </div>
        ) : (
          visible.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-border bg-card hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      {project.urgency === 'Rush' && (
                        <span className="rounded-full bg-red-500/15 border border-red-500/30 text-red-400 px-2 py-0.5 text-xs font-medium flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Rush
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                  <StatusBadge status={project.status} className="shrink-0" />
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />{project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />{project.budget}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />Due {project.deadline}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />{project.serviceType}
                  </span>
                  <span className="text-foreground font-medium">{project.companyName}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {project.industryCategory}
                  </span>
                  <span className="rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {project.preferredProviderType}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border/50 bg-muted/5">
                <span className="text-xs text-muted-foreground">Posted {project.createdAt}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-border/60"
                    onClick={() => { setActiveProjectId(project.id); setCurrentPage('provider-projects') }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => { setActiveProjectId(project.id); setCurrentPage('submit-proposal') }}
                  >
                    Submit Proposal <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
          <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
          </div>
        </div>
      )}
    </div>
  )
}
