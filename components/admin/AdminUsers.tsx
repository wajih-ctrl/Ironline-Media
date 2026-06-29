'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Building2, CheckCircle, Search, ShieldCheck, User, XCircle } from 'lucide-react'
import type { ApprovalStatus, Company } from '@/lib/mock-data'

export default function AdminUsers() {
  const { companies, providers, updateCompanyStatus, updateProviderApproval } = useAppStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'company' | 'provider'>('all')

  const users = [
    ...companies.map((company) => ({
      id: company.id,
      type: 'company' as const,
      name: company.name,
      contact: company.contactName,
      email: company.email,
      location: company.location,
      category: company.industryCategory,
      status: company.status,
      joined: company.joinDate,
    })),
    ...providers.map((provider) => ({
      id: provider.id,
      type: 'provider' as const,
      name: provider.name,
      contact: provider.serviceCategory,
      email: `${provider.name.toLowerCase().replaceAll(' ', '.')}@example.com`,
      location: provider.location,
      category: provider.subscriptionPlan === 'none' ? 'Free provider' : `${provider.subscriptionPlan} subscriber`,
      status: provider.approvalStatus,
      joined: provider.joinDate,
    })),
  ].filter((user) => {
    const matchesType = filter === 'all' || user.type === filter
    const haystack = `${user.name} ${user.contact} ${user.email} ${user.location} ${user.category}`.toLowerCase()
    return matchesType && haystack.includes(search.toLowerCase())
  })

  function setUserStatus(id: string, type: 'company' | 'provider', status: Company['status'] | ApprovalStatus) {
    if (type === 'company') updateCompanyStatus(id, status as Company['status'])
    else updateProviderApproval(id, status as ApprovalStatus)
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage company users and creative provider accounts from one place.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users, emails, locations..."
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary/60"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'company', 'provider'] as const).map((item) => (
            <Button
              key={item}
              variant={filter === item ? 'default' : 'outline'}
              onClick={() => setFilter(item)}
              className={filter === item ? 'bg-primary text-primary-foreground' : ''}
            >
              {item === 'all' ? 'All Users' : item === 'company' ? 'Companies' : 'Providers'}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {users.map((user) => (
                <tr key={`${user.type}-${user.id}`} className="hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        {user.type === 'company' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 capitalize text-muted-foreground">{user.type}</td>
                  <td className="px-4 py-4 hidden md:table-cell text-muted-foreground">{user.location}</td>
                  <td className="px-4 py-4 hidden lg:table-cell text-muted-foreground">{user.category}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-semibold capitalize">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {user.type === 'company' ? (
                        <>
                          <button title="Verify company" className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50" onClick={() => setUserStatus(user.id, user.type, 'verified')}>
                            <ShieldCheck className="h-4 w-4" />
                          </button>
                          <button title="Suspend company" className="p-1.5 rounded text-red-600 hover:bg-red-50" onClick={() => setUserStatus(user.id, user.type, 'suspended')}>
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button title="Approve provider" className="p-1.5 rounded text-emerald-600 hover:bg-emerald-50" onClick={() => setUserStatus(user.id, user.type, 'approved')}>
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button title="Reject provider" className="p-1.5 rounded text-red-600 hover:bg-red-50" onClick={() => setUserStatus(user.id, user.type, 'rejected')}>
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
