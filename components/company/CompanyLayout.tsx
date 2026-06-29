'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import {
  LayoutDashboard, PlusCircle, Sparkles, FileText, FolderOpen, MessageSquare, User, LogOut, Zap, Menu, X, ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CompanyDashboard from './CompanyDashboard'
import PostProject from './PostProject'
import AIMatchResults from './AIMatchResults'
import ProposalComparison from './ProposalComparison'
import ProjectWorkspace from '../shared/ProjectWorkspace'
import CompanyProfile from './CompanyProfile'

const NAV_ITEMS = [
  { key: 'company-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'post-project', label: 'Post Project', icon: PlusCircle },
  { key: 'ai-matches', label: 'AI Matches', icon: Sparkles },
  { key: 'proposals', label: 'Proposals', icon: FileText },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'company-profile', label: 'Profile', icon: User },
]

function renderPage(page: string) {
  switch (page) {
    case 'company-dashboard': return <CompanyDashboard />
    case 'post-project': return <PostProject />
    case 'ai-matches': return <AIMatchResults />
    case 'proposals': return <ProposalComparison />
    case 'projects': return <ProjectWorkspace />
    case 'messages': return <ProjectWorkspace defaultTab="messages" />
    case 'company-profile': return <CompanyProfile />
    default: return <CompanyDashboard />
  }
}

export default function CompanyLayout() {
  const { currentPage, setCurrentPage, logout, companies } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const company = companies.find((c) => c.id === 'c1')

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border shrink-0">
          <div className="h-7 w-7 rounded bg-accent flex items-center justify-center shrink-0 p-1">
            <img src="/Logo-2.jpeg" alt="Ironline Media" className="h-6 w-auto object-contain" />
          </div>
          <span className="font-bold text-lg tracking-tight text-sidebar-foreground">
            Ironline <span className="text-accent">Media</span>
          </span>
          <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-sidebar-border">
          <div className="text-xs text-muted-foreground">Logged in as</div>
          <div className="text-sm font-medium text-accent">{company?.name ?? 'Permian Flow Services'}</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setCurrentPage(item.key); setMobileOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5',
                currentPage === item.key
                  ? 'bg-accent/15 text-accent'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {currentPage === item.key && <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Exit Platform
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="h-16 border-b border-border flex items-center gap-3 px-4 lg:hidden shrink-0 bg-card">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/Logo-2.jpeg" alt="Ironline Media" className="h-6 w-auto rounded object-contain" />
            <span className="font-bold text-sm">Ironline Media</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderPage(currentPage)}
        </main>
      </div>
    </div>
  )
}
