'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import {
  LayoutDashboard, Briefcase, FileEdit, Image, FolderOpen, CreditCard, User, LogOut, Zap, Menu, X, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ProviderDashboard from './ProviderDashboard'
import ProviderOpportunities from './ProviderOpportunities'
import SubmitProposal from './SubmitProposal'
import ProviderPortfolio from './ProviderPortfolio'
import ProjectWorkspace from '../shared/ProjectWorkspace'
import SubscriptionPage from './SubscriptionPage'
import ProviderProfilePage from './ProviderProfilePage'

const NAV_ITEMS = [
  { key: 'provider-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { key: 'submit-proposal', label: 'Submit Proposal', icon: FileEdit },
  { key: 'portfolio', label: 'Portfolio', icon: Image },
  { key: 'provider-projects', label: 'Projects', icon: FolderOpen },
  { key: 'subscription', label: 'Subscription', icon: CreditCard },
  { key: 'provider-profile', label: 'Profile', icon: User },
]

function renderPage(page: string) {
  switch (page) {
    case 'provider-dashboard': return <ProviderDashboard />
    case 'opportunities': return <ProviderOpportunities />
    case 'submit-proposal': return <SubmitProposal />
    case 'portfolio': return <ProviderPortfolio />
    case 'provider-projects': return <ProjectWorkspace />
    case 'subscription': return <SubscriptionPage />
    case 'provider-profile': return <ProviderProfilePage />
    default: return <ProviderDashboard />
  }
}

export default function ProviderLayout() {
  const { currentPage, setCurrentPage, logout, providers } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const provider = providers.find((p) => p.id === 'p1')

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
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

        <div className="px-5 py-3 border-b border-sidebar-border">
          <div className="text-xs text-muted-foreground">Provider Account</div>
          <div className="text-sm font-medium text-primary">{provider?.name ?? 'Permian Drone Visuals'}</div>
          <div className="text-xs text-accent mt-0.5 capitalize">{provider?.subscriptionPlan ?? 'pro'} Plan - {provider?.subscriptionStatus ?? 'active'}</div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => { setCurrentPage(item.key); setMobileOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5',
                currentPage === item.key
                  ? 'bg-primary/15 text-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {currentPage === item.key && <ChevronRight className="h-3 w-3 ml-auto" />}
            </button>
          ))}
        </nav>

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

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
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
