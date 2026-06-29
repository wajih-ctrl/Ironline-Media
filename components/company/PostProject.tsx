'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ArrowRight, Upload, CheckCircle } from 'lucide-react'
import { Project } from '@/lib/mock-data'

const SERVICE_OPTIONS = ['Photography', 'Videography', 'Drone Footage', 'Graphic Design', 'Video Editing', 'Social Media Content', 'Website or Content Support', 'Event Coverage']
const INDUSTRY_OPTIONS = ['Pipeline Services', 'Midstream Operations', 'Upstream Field Services', 'Compressor Stations', 'Oilfield Equipment', 'Energy Events', 'Industrial Safety', 'Vendor Marketing', 'Other Oil & Gas Service']
const URGENCY_OPTIONS = ['Normal', 'Rush', 'Critical field deadline']
const PROVIDER_TYPE_OPTIONS = ['Local West Texas Provider', 'Oil and Gas Experienced Provider', 'Drone Licensed Provider', 'Video Editing Specialist', 'Full Service Media Team', 'Any Qualified Provider']

export default function PostProject() {
  const { addProject, setCurrentPage, setActiveProjectId } = useAppStore()

  const [form, setForm] = useState({
    title: '',
    companyName: 'Permian Flow Services',
    industryCategory: '',
    serviceType: '',
    location: '',
    budget: '',
    deadline: '',
    description: '',
    urgency: '',
    preferredProviderType: '',
  })
  const [files, setFiles] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [attempted, setAttempted] = useState(false)

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const isValid = form.title && form.serviceType && form.location && form.budget && form.description && form.urgency

  function handleSubmit() {
    setAttempted(true)
    if (!isValid) return

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: form.title,
      companyId: 'c1',
      companyName: form.companyName,
      serviceType: form.serviceType,
      industryCategory: form.industryCategory || 'Pipeline Services',
      location: form.location,
      budget: form.budget,
      deadline: form.deadline || '2025-08-01',
      description: form.description,
      urgency: form.urgency,
      preferredProviderType: form.preferredProviderType || 'Any Qualified Provider',
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
      invitedProviders: [],
      files: files,
      proposals: [],
      messages: [],
      deliverables: [],
    }
    addProject(newProject)
    setActiveProjectId(newProject.id)
    setSubmitted(true)
    setTimeout(() => {
      setCurrentPage('ai-matches')
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Project Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Your request has been added. Finding AI-matched providers...
          </p>
          <div className="h-1 w-48 mx-auto bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Post New Project Request</h1>
        <p className="text-muted-foreground text-sm mt-1">Tell us what you need and we&apos;ll match you with the right providers.</p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {attempted && !isValid && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Please complete the required project title, service, location, budget, description, and urgency fields.
          </div>
        )}
        {/* Section 1: Project Details */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Project Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Project Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Drone footage for pipeline ROW inspection"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Service Needed <span className="text-red-400">*</span></label>
                <select
                  value={form.serviceType}
                  onChange={(e) => set('serviceType', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                >
                  <option value="">Select service...</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Industry Category</label>
                <select
                  value={form.industryCategory}
                  onChange={(e) => set('industryCategory', e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                >
                  <option value="">Select category...</option>
                  {INDUSTRY_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Location <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="e.g. Midland, TX"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Budget Range <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => set('budget', e.target.value)}
                  placeholder="e.g. $1,000–$3,000"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Deadline</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => set('deadline', e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Project Description */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Project Description</h3>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Describe your project in detail. Include scope, deliverables expected, site conditions, and any special requirements..."
            rows={5}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
          />
        </div>

        {/* Section 3: Preferences */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Preferences</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Urgency Level <span className="text-red-400">*</span></label>
              <div className="flex flex-col gap-2">
                {URGENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set('urgency', opt)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition-all ${
                      form.urgency === opt
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border hover:border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`h-3 w-3 rounded-full border-2 ${form.urgency === opt ? 'border-accent bg-accent' : 'border-muted-foreground/40'}`} />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Preferred Provider Type</label>
              <div className="flex flex-col gap-2">
                {PROVIDER_TYPE_OPTIONS.slice(0, 5).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set('preferredProviderType', opt)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm text-left transition-all ${
                      form.preferredProviderType === opt
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`h-3 w-3 rounded-full border-2 shrink-0 ${form.preferredProviderType === opt ? 'border-primary bg-primary' : 'border-muted-foreground/40'}`} />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Files */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Reference Files</h3>
          <div
            className="rounded-lg border-2 border-dashed border-border hover:border-primary/40 transition-colors p-6 text-center cursor-pointer"
            onClick={() => setFiles(['project_brief.pdf', 'reference_images.zip'])}
          >
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drop files here or click to upload</p>
            <p className="text-xs text-muted-foreground/60 mt-1">PDF, PNG, JPG, MP4, ZIP up to 500MB</p>
          </div>
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {files.map((f) => (
                <div key={f} className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-emerald-400" />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setCurrentPage('company-dashboard')}>
          Cancel
        </Button>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8"
          onClick={handleSubmit}
        >
          Submit Request — Find AI Matches
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
