'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  FileText, Star, DollarSign, Clock, CheckCircle, ChevronDown, Package, MessageSquare, Trophy,
} from 'lucide-react'

export default function ProposalComparison() {
  const { projects, selectProvider, setCurrentPage, setActiveProjectId } = useAppStore()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{ projectId: string; providerId: string; providerName: string } | null>(null)

  // Get projects with proposals
  const projectsWithProposals = projects.filter((p) => p.proposals.length > 0)
  const activeProject = selectedProject
    ? projectsWithProposals.find((p) => p.id === selectedProject) ?? projectsWithProposals[0]
    : projectsWithProposals[0]

  function handleSelectProvider() {
    if (!confirmModal) return
    selectProvider(confirmModal.projectId, confirmModal.providerId, confirmModal.providerName)
    setActiveProjectId(confirmModal.projectId)
    setConfirmModal(null)
    setTimeout(() => setCurrentPage('projects'), 800)
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Proposal Comparison</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review and compare provider proposals side by side</p>
      </div>

      {projectsWithProposals.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-semibold mb-2">No Proposals Yet</h2>
          <p className="text-sm text-muted-foreground mb-4">Invite providers to bid on your projects to receive proposals here.</p>
          <Button onClick={() => setCurrentPage('ai-matches')} className="bg-accent text-accent-foreground hover:bg-accent/90">
            View AI Matches
          </Button>
        </div>
      ) : (
        <>
          {/* Project selector */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap gap-2">
              {projectsWithProposals.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p.id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    activeProject?.id === p.id
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border text-muted-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  {p.title.slice(0, 40)}{p.title.length > 40 ? '...' : ''}
                  <span className="ml-2 text-xs opacity-70">({p.proposals.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project info */}
          {activeProject && (
            <div className="rounded-lg bg-muted/20 border border-border/50 px-5 py-3 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{activeProject.title}</span>
              <span>{activeProject.serviceType}</span>
              <span>{activeProject.budget}</span>
              <span>{activeProject.location}</span>
              <StatusBadge status={activeProject.status} />
            </div>
          )}

          {/* Proposals grid */}
          {activeProject && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {activeProject.proposals.map((proposal) => {
                const provider = useProviderById(proposal.providerId)
                const isSelected = activeProject.selectedProviderId === proposal.providerId

                return (
                  <div
                    key={proposal.id}
                    className={`rounded-xl border bg-card flex flex-col transition-all ${
                      isSelected ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-border'
                    }`}
                  >
                    {/* Provider header */}
                    <div className="p-5 border-b border-border/50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary">
                            {proposal.providerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{proposal.providerName}</p>
                            <p className="text-xs text-muted-foreground">{provider?.serviceCategory}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-400">{proposal.matchScore}%</div>
                          <div className="text-xs text-muted-foreground">Match</div>
                        </div>
                      </div>
                      {/* Rating */}
                      {provider && (
                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            {provider.rating} ({provider.reviewCount})
                          </span>
                          <span>{provider.location}</span>
                          <span>{provider.availability}</span>
                        </div>
                      )}
                    </div>

                    {/* Proposal details */}
                    <div className="p-5 flex-1 space-y-4">
                      {/* Price & timeline */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-muted/30 border border-border/50 p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <DollarSign className="h-3 w-3" /> Price
                          </div>
                          <div className="font-bold text-lg">${proposal.price.toLocaleString()}</div>
                        </div>
                        <div className="rounded-lg bg-muted/30 border border-border/50 p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <Clock className="h-3 w-3" /> Timeline
                          </div>
                          <div className="font-semibold text-sm">{proposal.timeline}</div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5">
                          <MessageSquare className="h-3 w-3" /> Proposal
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                          {proposal.message}
                        </p>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-2">
                          <Package className="h-3 w-3" /> Deliverables
                        </div>
                        <ul className="space-y-1">
                          {proposal.deliverables.slice(0, 3).map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs">
                              <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{d}</span>
                            </li>
                          ))}
                          {proposal.deliverables.length > 3 && (
                            <li className="text-xs text-muted-foreground pl-5">+{proposal.deliverables.length - 3} more</li>
                          )}
                        </ul>
                      </div>

                      {/* Questions */}
                      {proposal.questions && (
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1.5">Provider Question</div>
                          <p className="text-xs italic text-muted-foreground border-l-2 border-border pl-3">
                            &ldquo;{proposal.questions}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="p-4 border-t border-border/50">
                      <StatusBadge status={proposal.status} className="w-full justify-center mb-3" />
                      {isSelected ? (
                        <Button
                          className="w-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default"
                          disabled
                        >
                          <Trophy className="h-4 w-4 mr-2" /> Provider Selected
                        </Button>
                      ) : activeProject.selectedProviderId ? (
                        <Button variant="outline" className="w-full text-xs" disabled>
                          Not Selected
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          onClick={() => setConfirmModal({ projectId: activeProject.id, providerId: proposal.providerId, providerName: proposal.providerName })}
                        >
                          Select This Provider
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Confirm modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="rounded-xl border border-border bg-card p-6 max-w-md w-full shadow-2xl">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold text-center mb-2">Award Project?</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              You are awarding this project to <span className="text-foreground font-medium">{confirmModal.providerName}</span>. This will update the project status to Awarded.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmModal(null)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleSelectProvider}>
                Confirm Award
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper hook-like function (accessing store inside map)
function useProviderById(id: string) {
  const providers = useAppStore.getState().providers
  return providers.find((p) => p.id === id)
}
