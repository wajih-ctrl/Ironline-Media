'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  FolderOpen, MessageSquare, FileText, CheckSquare, MapPin, Calendar, DollarSign, User, Send, CheckCircle, Square, ChevronRight, Clock, Package,
} from 'lucide-react'
import type { Project } from '@/lib/mock-data'

const STATUS_FLOW: Project['status'][] = ['New', 'Matched', 'Proposal Received', 'Awarded', 'In Progress', 'Delivered', 'Completed']

interface Props {
  defaultTab?: string
}

export default function ProjectWorkspace({ defaultTab = 'overview' }: Props) {
  const { projects, activeProjectId, setActiveProjectId, currentRole, addMessage, toggleDeliverable, updateProjectStatus } = useAppStore()
  const [tab, setTab] = useState(defaultTab)
  const [msgInput, setMsgInput] = useState('')
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null)

  const allProjects = projects.filter((p) =>
    currentRole === 'company'
      ? p.companyId === 'c1'
      : currentRole === 'provider'
      ? p.invitedProviders.includes('p1') || p.selectedProviderId === 'p1'
      : true
  )

  const project = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) ?? allProjects[0]
    : allProjects[0]

  const TABS = [
    { key: 'overview', label: 'Overview', icon: FolderOpen },
    { key: 'messages', label: `Messages (${project?.messages.length ?? 0})`, icon: MessageSquare },
    { key: 'files', label: 'Files', icon: FileText },
    { key: 'deliverables', label: 'Deliverables', icon: CheckSquare },
  ]

  function sendMessage() {
    if (!msgInput.trim() || !project) return
    addMessage(project.id, {
      id: `msg-${Date.now()}`,
      sender: currentRole === 'company' ? 'Travis Holloway' : 'Permian Drone Visuals',
      role: currentRole === 'company' ? 'company' : 'provider',
      text: msgInput.trim(),
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
    })
    setMsgInput('')
  }

  const defaultFiles = [
    { name: 'pipeline_reference_video.mp4', size: '284 MB', type: 'video', added: '2025-06-05' },
    { name: 'brand_guidelines.pdf', size: '4.2 MB', type: 'pdf', added: '2025-06-05' },
    { name: 'drone_shot_list.pdf', size: '1.1 MB', type: 'pdf', added: '2025-06-08' },
    { name: 'final_linkedin_edits.zip', size: '92 MB', type: 'archive', added: '2025-06-12' },
  ]
  const files = project?.files.length
    ? project.files.map((name) => ({
        name,
        size: name.endsWith('.zip') ? '92 MB' : name.endsWith('.mp4') ? '284 MB' : '1.2 MB',
        type: name.endsWith('.zip') ? 'archive' : name.endsWith('.mp4') ? 'video' : 'pdf',
        added: project.createdAt,
      }))
    : defaultFiles

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-0">
      {/* Project list sidebar */}
      <div className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-card/50 overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-sm">Projects</h2>
        </div>
        <div className="divide-y divide-border/50">
          {allProjects.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">No projects yet</div>
          ) : (
            allProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProjectId(p.id)}
                className={`w-full text-left p-4 hover:bg-muted/20 transition-colors ${project?.id === p.id ? 'bg-muted/30 border-l-2 border-accent' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium leading-tight line-clamp-2">{p.title}</p>
                  <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />{p.location}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main workspace */}
      {project ? (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Project header */}
          <div className="p-5 border-b border-border bg-card/30 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-bold text-base leading-tight">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{project.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {project.deadline}</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{project.budget}</span>
                  {project.selectedProviderName && (
                    <span className="flex items-center gap-1"><User className="h-3 w-3 text-emerald-400" />{project.selectedProviderName}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={project.status} />
                {currentRole !== 'provider' && (
                  <select
                    value={project.status}
                    onChange={(e) => updateProjectStatus(project.id, e.target.value as Project['status'])}
                    className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-primary/60 transition-colors"
                  >
                    {STATUS_FLOW.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
              </div>
            </div>

            {/* Status timeline */}
            <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-1">
              {STATUS_FLOW.map((s, i) => {
                const currentIdx = STATUS_FLOW.indexOf(project.status)
                const done = i < currentIdx
                const active = i === currentIdx
                return (
                  <div key={s} className="flex items-center gap-1 shrink-0">
                    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      active ? 'bg-accent/15 text-accent border border-accent/30' :
                      done ? 'bg-emerald-500/10 text-emerald-400' :
                      'text-muted-foreground'
                    }`}>
                      {done && <CheckCircle className="h-3 w-3" />}
                      {s}
                    </div>
                    {i < STATUS_FLOW.length - 1 && (
                      <div className={`h-px w-4 ${done ? 'bg-emerald-500/50' : 'bg-border'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border px-5 gap-0 shrink-0 overflow-x-auto">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  tab === key ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-5">
            {tab === 'overview' && (
              <div className="space-y-5 max-w-2xl">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-sm mb-3">Project Brief</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Service Type', value: project.serviceType, icon: Package },
                    { label: 'Industry', value: project.industryCategory, icon: FolderOpen },
                    { label: 'Urgency', value: project.urgency, icon: Clock },
                    { label: 'Provider Preference', value: project.preferredProviderType, icon: User },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-lg border border-border bg-muted/20 p-4">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                        <Icon className="h-3 w-3" />{label}
                      </div>
                      <div className="text-sm font-medium">{value}</div>
                    </div>
                  ))}
                </div>
                {project.selectedProviderId && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                    <div className="text-xs font-medium text-emerald-400 mb-2">Selected Provider</div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/15 flex items-center justify-center font-bold text-emerald-400">
                        {project.selectedProviderName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{project.selectedProviderName}</p>
                        <p className="text-xs text-muted-foreground">{project.proposals.find(p => p.status === 'selected')?.timeline} delivery</p>
                      </div>
                      <div className="ml-auto text-lg font-bold text-emerald-400">
                        ${project.proposals.find(p => p.status === 'selected')?.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'messages' && (
              <div className="flex flex-col h-full max-w-2xl">
                <div className="flex-1 space-y-4 mb-4">
                  {project.messages.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground py-10">No messages yet. Start the conversation.</div>
                  ) : (
                    project.messages.map((msg) => {
                      const isMe = (currentRole === 'company' && msg.role === 'company') || (currentRole === 'provider' && msg.role === 'provider')
                      return (
                        <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.role === 'company' ? 'bg-accent/15 text-accent' : 'bg-primary/15 text-primary'}`}>
                            {msg.sender.charAt(0)}
                          </div>
                          <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                            <div className={`rounded-2xl px-4 py-2.5 text-sm ${isMe ? 'bg-primary/20 text-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                              {msg.text}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 px-1">{msg.sender} · {msg.timestamp}</div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
                <div className="flex gap-2 mt-auto">
                  <input
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                  />
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-4" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {tab === 'files' && (
              <div className="space-y-3 max-w-2xl">
                {downloadedFile && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Mock download prepared for {downloadedFile}.
                  </div>
                )}
                {files.map((file) => (
                  <div key={file.name} className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground uppercase">
                      {file.type === 'video' ? 'MP4' : file.type === 'pdf' ? 'PDF' : 'ZIP'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size} · Added {file.added}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground shrink-0"
                      onClick={() => {
                        setDownloadedFile(file.name)
                        setTimeout(() => setDownloadedFile(null), 2500)
                      }}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'deliverables' && (
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {project.deliverables.filter((d) => d.completed).length} of {project.deliverables.length} complete
                  </p>
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: project.deliverables.length ? `${(project.deliverables.filter(d => d.completed).length / project.deliverables.length) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                {project.deliverables.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-8">No deliverables defined yet.</div>
                ) : (
                  project.deliverables.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => toggleDeliverable(project.id, d.id)}
                      className="w-full flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/20 transition-colors"
                    >
                      {d.completed
                        ? <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                        : <Square className="h-5 w-5 text-muted-foreground shrink-0" />
                      }
                      <span className={`text-sm ${d.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {d.title}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Select a project to view workspace
        </div>
      )}
    </div>
  )
}
