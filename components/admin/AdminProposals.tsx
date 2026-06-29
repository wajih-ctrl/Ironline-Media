'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { DollarSign, FileText, Search, Trophy } from 'lucide-react'

export default function AdminProposals() {
  const { projects, providers, selectProvider, setActiveProjectId, setCurrentPage } = useAppStore()
  const [search, setSearch] = useState('')

  const proposals = projects.flatMap((project) =>
    project.proposals.map((proposal) => ({
      ...proposal,
      projectTitle: project.title,
      companyName: project.companyName,
      projectStatus: project.status,
      selectedProviderId: project.selectedProviderId,
    }))
  ).filter((proposal) => {
    const text = `${proposal.projectTitle} ${proposal.companyName} ${proposal.providerName} ${proposal.message}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Proposal Management</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review submitted bids, proposal status, providers, pricing, and award decisions.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total proposals</p>
          <p className="mt-1 text-3xl font-bold">{proposals.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Selected proposals</p>
          <p className="mt-1 text-3xl font-bold">{proposals.filter((p) => p.status === 'selected').length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Open bid value</p>
          <p className="mt-1 text-3xl font-bold">${proposals.filter((p) => p.status === 'submitted').reduce((sum, p) => sum + p.price, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search proposals, companies, providers..."
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary/60"
        />
      </div>

      <div className="space-y-3">
        {proposals.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold">No proposals found</p>
            <p className="text-sm text-muted-foreground">Submitted provider bids will appear here.</p>
          </div>
        ) : proposals.map((proposal) => {
          const provider = providers.find((p) => p.id === proposal.providerId)
          const isSelected = proposal.status === 'selected'
          return (
            <div key={proposal.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold">{proposal.projectTitle}</h2>
                    <StatusBadge status={proposal.status} />
                    <StatusBadge status={proposal.projectStatus} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{proposal.companyName} - {proposal.providerName} - {provider?.serviceCategory}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{proposal.message}</p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:items-end">
                  <div className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <DollarSign className="h-4 w-4 text-accent" />
                    {proposal.price.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">{proposal.timeline} - {proposal.matchScore}% match</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setActiveProjectId(proposal.projectId); setCurrentPage('admin-projects') }}
                >
                  View Project
                </Button>
                {!proposal.selectedProviderId && (
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => selectProvider(proposal.projectId, proposal.providerId, proposal.providerName)}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Award Provider
                  </Button>
                )}
                {isSelected && (
                  <span className="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    Awarded proposal
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
