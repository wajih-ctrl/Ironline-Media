'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Search, Building2, MapPin, Mail, ChevronDown, CheckCircle, XCircle, Shield,
  Activity, FolderOpen,
} from 'lucide-react'
import type { Company } from '@/lib/mock-data'

const STATUS_COLORS: Record<Company['status'], string> = {
  active: 'bg-primary/15 text-primary',
  verified: 'bg-emerald-400/15 text-emerald-400',
  suspended: 'bg-destructive/15 text-destructive',
}

export default function AdminCompanies() {
  const { companies, projects, updateCompanyStatus } = useAppStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<Company['status'] | 'all'>('all')

  const filtered = companies.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  function getCompanyProjects(companyId: string) {
    return projects.filter((p) => p.companyId === companyId)
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Management</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage and monitor all company accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Company['status'] | 'all')}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="verified">Verified</option>
            <option value="suspended">Suspended</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} companies found</p>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left px-5 py-3.5 text-xs text-muted-foreground font-medium">Company</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden lg:table-cell">Industry</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium">Projects</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Last Active</th>
                <th className="px-4 py-3.5 text-xs text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((c) => {
                const companyProjects = getCompanyProjects(c.id)
                return (
                  <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-2.5 w-2.5" />{c.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{c.contactName}</td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{c.location}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden lg:table-cell">{c.industryCategory}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs flex items-center gap-1 text-muted-foreground">
                        <FolderOpen className="h-3 w-3" />{companyProjects.length}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[c.status]}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell">{c.lastActivity}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        {c.status !== 'verified' && (
                          <button
                            onClick={() => updateCompanyStatus(c.id, 'verified')}
                            title="Verify"
                            className="p-1.5 rounded hover:bg-emerald-400/10 text-emerald-400 transition-colors"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {c.status !== 'suspended' && (
                          <button
                            onClick={() => updateCompanyStatus(c.id, 'suspended')}
                            title="Suspend"
                            className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {c.status !== 'active' && (
                          <button
                            onClick={() => updateCompanyStatus(c.id, 'active')}
                            title="Restore to Active"
                            className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"
                          >
                            <Activity className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
