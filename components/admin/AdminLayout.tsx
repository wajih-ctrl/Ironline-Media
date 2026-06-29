'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderOpen,
  CreditCard,
  FileText,
  BarChart3,
  Tag,
  LogOut,
  Zap,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import AdminDashboard from './AdminDashboard'
import AdminProviders from './AdminProviders'
import AdminUsers from './AdminUsers'
import AdminCompanies from './AdminCompanies'
import AdminProjects from './AdminProjects'
import AdminProposals from './AdminProposals'
import AdminSubscriptions from './AdminSubscriptions'
import AdminAnalytics from './AdminAnalytics'
import AdminCategories from './AdminCategories'

const NAV_ITEMS = [
  { key: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'admin-users', label: 'Users', icon: ShieldCheck },
  { key: 'admin-providers', label: 'Providers', icon: Users },
  { key: 'admin-companies', label: 'Companies', icon: Building2 },
  { key: 'admin-projects', label: 'Projects', icon: FolderOpen },
  { key: 'admin-proposals', label: 'Proposals', icon: FileText },
  { key: 'admin-subscriptions', label: 'Subscriptions', icon: CreditCard },
  { key: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'admin-categories', label: 'Categories', icon: Tag },
]

function renderPage(page: string) {
  switch (page) {
    case 'admin-dashboard':     return <AdminDashboard />
    case 'admin-users':         return <AdminUsers />
    case 'admin-providers':     return <AdminProviders />
    case 'admin-companies':     return <AdminCompanies />
    case 'admin-projects':      return <AdminProjects />
    case 'admin-proposals':     return <AdminProposals />
    case 'admin-subscriptions': return <AdminSubscriptions />
    case 'admin-analytics':     return <AdminAnalytics />
    case 'admin-categories':    return <AdminCategories />
    default:                    return <AdminDashboard />
  }
}

export default function AdminLayout() {
  const { currentPage, setCurrentPage, logout, providers } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const pendingCount = providers.filter((p) => p.approvalStatus === 'pending').length

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-sidebar-border shrink-0">
          <div className="h-7 w-7 rounded bg-accent flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight text-sidebar-foreground">
            Ironline <span className="text-accent">Media</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="text-xs text-muted-foreground">Admin Portal</div>
          </div>
          <div className="text-sm font-semibold text-foreground mt-0.5">Ironline Admin</div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              <Bell className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">
                {pendingCount} pending approval{pendingCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key
            const hasBadge = item.key === 'admin-providers' && pendingCount > 0
            return (
              <button
                key={item.key}
                onClick={() => { setCurrentPage(item.key); setMobileOpen(false) }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {hasBadge && (
                  <span className="h-5 min-w-5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex items-center justify-center px-1">
                    {pendingCount}
                  </span>
                )}
                {isActive && !hasBadge && (
                  <ChevronRight className="h-3 w-3 shrink-0" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Exit Admin Portal
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="h-16 border-b border-border flex items-center gap-3 px-4 lg:hidden shrink-0 bg-card">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/Logo-2.jpeg" alt="Ironline Media" className="h-6 w-auto rounded object-contain" />
            <span className="font-bold text-sm">Ironline Admin</span>
          </div>
          {pendingCount > 0 && (
            <span className="ml-auto text-xs bg-yellow-500/15 text-yellow-400 px-2 py-0.5 rounded-full font-medium">
              {pendingCount} pending
            </span>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderPage(currentPage)}
        </main>
      </div>
    </div>
  )
}
