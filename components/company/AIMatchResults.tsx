'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  Sparkles, MapPin, Star, Clock, CheckCircle, Send, ChevronDown, ChevronUp, Zap,
} from 'lucide-react'

export default function AIMatchResults() {
  const { projects, providers, activeProjectId, addInvite, setCurrentPage } = useAppStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Get the most recent/relevant project
  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId)
    : projects[0]

  const matchedProviders = providers
    .filter((p) => p.approvalStatus === 'approved')
    .map((provider) => {
      const serviceMatch = activeProject && provider.serviceCategory.toLowerCase().includes(activeProject.serviceType.split(' ')[0].toLowerCase())
      const locationMatch = activeProject && provider.location.split(',')[0] === activeProject.location.split(',')[0]
      const score = Math.min(99, (provider.matchScore ?? 78) + (serviceMatch ? 7 : 0) + (locationMatch ? 4 : 0))
      return { ...provider, matchScore: score }
    })
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))

  const invitedSet = new Set(activeProject?.invitedProviders ?? [])

  function handleInvite(providerId: string) {
    if (!activeProject) return
    addInvite(activeProject.id, providerId)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Match Results</h1>
          <p className="text-muted-foreground text-sm">Providers matched to your project using AI-powered criteria</p>
        </div>
      </div>

      {/* Project Summary */}
      {activeProject && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-accent font-medium uppercase tracking-wider mb-1">Active Project</div>
              <h2 className="font-semibold text-base mb-1">{activeProject.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{activeProject.location}</span>
                <span>{activeProject.serviceType}</span>
                <span>{activeProject.budget}</span>
                <span>Deadline: {activeProject.deadline}</span>
              </div>
            </div>
            <StatusBadge status={activeProject.urgency} />
          </div>
        </div>
      )}

      {/* Match criteria */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-sm font-medium mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          AI Matching Criteria Used
        </div>
        <div className="flex flex-wrap gap-2">
          {['Service Category Match', 'Permian Basin Location', 'Oil & Gas Experience', 'Portfolio Relevance', 'Budget Fit', 'Current Availability', 'Provider Rating'].map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Provider Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{matchedProviders.length} Providers Matched</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setCurrentPage('proposals')}>
            View Proposals
          </Button>
        </div>

        {matchedProviders.map((provider) => {
          const invited = invitedSet.has(provider.id)
          const isExpanded = expandedId === provider.id

          return (
            <div
              key={provider.id}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Card top */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 text-lg font-bold text-primary">
                    {provider.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{provider.name}</h3>
                          {provider.featured && (
                            <span className="flex items-center gap-1 rounded-full bg-accent/15 border border-accent/30 px-2 py-0.5 text-xs text-accent">
                              <Zap className="h-2.5 w-2.5" /> Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{provider.serviceCategory}</p>
                      </div>
                      {/* Match score */}
                      <div className="shrink-0 text-right">
                        <div className="text-2xl font-bold text-emerald-400">{provider.matchScore}%</div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>

                    {/* Details row */}
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{provider.location}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />{provider.rating} ({provider.reviewCount} reviews)</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-emerald-400" />{provider.availability}</span>
                      <span className="font-medium text-foreground">{provider.estimatedPriceRange}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {provider.specialties.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      {provider.oilGasExperience && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                          O&G Experience
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match reason */}
                <div className="mt-4 rounded-lg bg-muted/30 border border-border/50 p-3">
                  <div className="text-xs text-muted-foreground font-medium mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-accent" />
                    Why this provider matches
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {provider.bio.slice(0, 160)}...
                  </p>
                </div>

                {/* Match score bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${provider.matchScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{provider.experience} experience</span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border/50 bg-muted/10 pt-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Equipment & Capabilities</div>
                      <ul className="space-y-1">
                        {provider.equipment.map((e) => (
                          <li key={e} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Past Oil & Gas Projects</div>
                      <ul className="space-y-1">
                        {provider.pastProjects.map((p) => (
                          <li key={p} className="text-xs text-muted-foreground">— {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-border/50 bg-muted/5">
                <button
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : provider.id)}
                >
                  {isExpanded ? <><ChevronUp className="h-3.5 w-3.5" /> Hide Details</> : <><ChevronDown className="h-3.5 w-3.5" /> View Details</>}
                </button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-border/60"
                    onClick={() => setExpandedId(isExpanded ? null : provider.id)}
                  >
                    View Profile
                  </Button>
                  {invited ? (
                    <Button
                      size="sm"
                      className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                      disabled
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Invited
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="text-xs bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => handleInvite(provider.id)}
                    >
                      <Send className="h-3.5 w-3.5 mr-1" /> Invite to Bid
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
