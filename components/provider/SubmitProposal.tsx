'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { CheckCircle, Plus, X, ArrowRight, MapPin, DollarSign, Calendar } from 'lucide-react'
import type { Proposal } from '@/lib/mock-data'

export default function SubmitProposal() {
  const { projects, activeProjectId, setActiveProjectId, addProposal, setCurrentPage } = useAppStore()
  const [submitted, setSubmitted] = useState(false)
  const [submittedProjectName, setSubmittedProjectName] = useState('')
  const [attempted, setAttempted] = useState(false)

  const proposalProjects = projects.filter((p) =>
    ['New', 'Matched', 'Proposal Received'].includes(p.status) &&
    !p.proposals.some((proposal) => proposal.providerId === 'p1')
  )

  const activeCandidate = activeProjectId ? proposalProjects.find((p) => p.id === activeProjectId) : undefined
  const project = activeCandidate ?? proposalProjects[0]

  const [form, setForm] = useState({
    price: '',
    timeline: '',
    message: '',
    questions: '',
  })
  const [deliverables, setDeliverables] = useState<string[]>([''])
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([''])

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }))

  const isValid = form.price && form.timeline && form.message && deliverables.some(Boolean)

  function handleSubmit() {
    setAttempted(true)
    if (!isValid || !project) return

    const proposal: Proposal = {
      id: `prop-${Date.now()}`,
      providerId: 'p1',
      providerName: 'Permian Drone Visuals',
      projectId: project.id,
      price: Number(form.price.replace(/[^0-9]/g, '')),
      timeline: form.timeline,
      message: form.message,
      deliverables: deliverables.filter(Boolean),
      portfolioLinks: portfolioLinks.filter(Boolean),
      questions: form.questions,
      status: 'submitted',
      submittedAt: new Date().toISOString().split('T')[0],
      matchScore: 94,
    }
    addProposal(project.id, proposal)
    setActiveProjectId(project.id)
    setSubmittedProjectName(project.companyName)
    setSubmitted(true)
    setTimeout(() => setCurrentPage('provider-projects'), 2000)
  }

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Proposal Submitted!</h2>
          <p className="text-sm text-muted-foreground">Your proposal has been sent to {submittedProjectName}. We&apos;ll notify you when they respond.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Submit Proposal</h1>
        <p className="text-muted-foreground text-sm mt-1">Craft a strong proposal to win this project.</p>
      </div>

      {/* Project Summary */}
      {project ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">Selected opportunity</label>
            <select
              value={project.id}
              onChange={(e) => {
                setActiveProjectId(e.target.value)
                setAttempted(false)
                setSubmitted(false)
              }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
            >
              {[project, ...proposalProjects.filter((p) => p.id !== project.id)].map((item) => (
                <option key={item.id} value={item.id}>{item.title} - {item.companyName}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-accent font-medium uppercase tracking-wider mb-2">Responding To</div>
          <h2 className="font-semibold mb-2">{project.title}</h2>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{project.location}</span>
            <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{project.budget}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {project.deadline}</span>
            <span>{project.companyName}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-3">{project.description}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          No project selected.{' '}
          <button onClick={() => setCurrentPage('opportunities')} className="text-accent hover:underline">
            Browse opportunities
          </button>
        </div>
      )}

      {project && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {attempted && !isValid && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Add a price, timeline, proposal message, and at least one deliverable before submitting.
            </div>
          )}

          {/* Pricing & Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Pricing & Timeline</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Your Price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => set('price', e.target.value)}
                    placeholder="e.g. 2200"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Timeline <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.timeline}
                  onChange={(e) => set('timeline', e.target.value)}
                  placeholder="e.g. 3 business days"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Proposal Message */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Proposal Message</h3>
            <textarea
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder="Describe your approach, relevant experience, and why you're the best fit for this project. Mention your equipment, availability, and any relevant Permian Basin work."
              rows={5}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors resize-none"
            />
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Deliverables</h3>
            <div className="space-y-2">
              {deliverables.map((d, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={d}
                    onChange={(e) => {
                      const next = [...deliverables]
                      next[i] = e.target.value
                      setDeliverables(next)
                    }}
                    placeholder={`Deliverable ${i + 1}`}
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm outline-none focus:border-primary/60 transition-colors"
                  />
                  {deliverables.length > 1 && (
                    <button
                      onClick={() => setDeliverables(deliverables.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setDeliverables([...deliverables, ''])}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add deliverable
              </button>
            </div>
          </div>

          {/* Portfolio Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Portfolio Links</h3>
            <div className="space-y-2">
              {portfolioLinks.map((l, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={l}
                    onChange={(e) => {
                      const next = [...portfolioLinks]
                      next[i] = e.target.value
                      setPortfolioLinks(next)
                    }}
                    placeholder="e.g. yourwebsite.com/oilfield-work"
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm outline-none focus:border-primary/60 transition-colors"
                  />
                  {portfolioLinks.length > 1 && (
                    <button
                      onClick={() => setPortfolioLinks(portfolioLinks.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setPortfolioLinks([...portfolioLinks, ''])}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add portfolio link
              </button>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Questions for Client</h3>
            <textarea
              value={form.questions}
              onChange={(e) => set('questions', e.target.value)}
              placeholder="Any questions about site access, PPE requirements, safety orientation, or project scope..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors resize-none"
            />
          </div>
        </div>
      )}

      {project && (
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentPage('opportunities')}>
            Cancel
          </Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
            onClick={handleSubmit}
          >
            Submit Proposal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
