'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Search, MapPin, DollarSign, Calendar, ChevronDown, FolderOpen,
  Building2, User, ChevronRight, ChevronUp,
} from 'lucide-react'
import type { ProjectStatus } from '@/lib/mock-data'

export default function AdminProjects() {
  const { projects, providers } = useAppStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const STATUS_OPTIONS: (ProjectStatus | 'all')[] = [
    'all', 'New', 'Matched', 'Proposal Received', 'Awarded', 'In Progress', 'Delivered', 'Completed',
  ]

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.companyName.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.serviceType.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    return matchSearch && matchStatus
  })

  function getProviderName(id: string) {
    return providers.find((p) => p.id === id)?.name ?? id
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Projects</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Monitor all projects across the platform</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'all')}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} projects found</p>

      <div className="space-y-3">
        {filtered.map((p) => {
          const isExpanded = expandedId === p.id
          return (
            <div key={p.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                className="w-full flex items-start gap-4 p-4 text-left hover:bg-muted/10 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
              >
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm leading-tight">{p.title}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={p.status} />
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{p.companyName}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                    <span className="flex items-center gap-1 text-accent"><DollarSign className="h-3 w-3" />{p.budget}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.deadline}</span>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border/50 bg-card/50 px-4 pb-4 pt-4 space-y-4">
                  <p className="text-sm text-foreground/80 leading-relaxed">{p.description}</p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Service Type</span>
                      <span className="font-medium">{p.serviceType}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Industry</span>
                      <span className="font-medium">{p.industryCategory}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Urgency</span>
                      <span className="font-medium">{p.urgency}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Posted</span>
                      <span className="font-medium">{p.createdAt}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Proposals</span>
                      <span className="font-medium">{p.proposals.length}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-0.5">Messages</span>
                      <span className="font-medium">{p.messages.length}</span>
                    </div>
                  </div>

                  {p.selectedProviderId && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                      <User className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="text-xs">
                        <span className="text-muted-foreground">Awarded to: </span>
                        <span className="font-semibold text-emerald-400">{p.selectedProviderName}</span>
                      </div>
                    </div>
                  )}

                  {p.invitedProviders.length > 0 && (
                    <div className="text-xs">
                      <span className="text-muted-foreground block mb-1">Invited Providers</span>
                      <div className="flex flex-wrap gap-1.5">
                        {p.invitedProviders.map((id) => (
                          <span key={id} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                            {getProviderName(id)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
