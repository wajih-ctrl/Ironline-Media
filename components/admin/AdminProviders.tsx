'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Search, Star, MapPin, CheckCircle, XCircle, Clock, Filter, ChevronDown,
  Shield, Users, TrendingUp, Award,
} from 'lucide-react'
import type { ApprovalStatus } from '@/lib/mock-data'

const APPROVAL_COLORS: Record<ApprovalStatus, string> = {
  pending: 'bg-yellow-400/15 text-yellow-400',
  approved: 'bg-emerald-400/15 text-emerald-400',
  rejected: 'bg-destructive/15 text-destructive',
}

const APPROVAL_ICONS: Record<ApprovalStatus, typeof CheckCircle> = {
  approved: CheckCircle,
  rejected: XCircle,
  pending: Clock,
}

export default function AdminProviders() {
  const { providers, updateProviderApproval, updateProviderFeatured, updateProviderSubscription } = useAppStore()
  const [search, setSearch] = useState('')
  const [filterApproval, setFilterApproval] = useState<ApprovalStatus | 'all'>('all')
  const [filterPlan, setFilterPlan] = useState<'all' | 'none' | 'basic' | 'pro'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = providers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.serviceCategory.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    const matchApproval = filterApproval === 'all' || p.approvalStatus === filterApproval
    const matchPlan = filterPlan === 'all' || p.subscriptionPlan === filterPlan
    return matchSearch && matchApproval && matchPlan
  })

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Provider Management</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Approve, manage, and monitor service providers</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-yellow-400/15 text-yellow-400 px-2.5 py-1 rounded-full font-medium">
            {providers.filter((p) => p.approvalStatus === 'pending').length} Pending
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={filterApproval}
              onChange={(e) => setFilterApproval(e.target.value as ApprovalStatus | 'all')}
              className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as 'all' | 'none' | 'basic' | 'pro')}
              className="appearance-none pl-3 pr-8 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="none">Free</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} providers found</p>

      {/* Provider Cards */}
      <div className="space-y-3">
        {filtered.map((p) => {
          const Icon = APPROVAL_ICONS[p.approvalStatus]
          const isExpanded = expandedId === p.id
          return (
            <div key={p.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/10 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setExpandedId(isExpanded ? null : p.id)
                  }
                }}
              >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{p.name}</span>
                    {p.featured && (
                      <span className="text-xs bg-accent/15 text-accent px-1.5 py-0.5 rounded font-medium">Featured</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${APPROVAL_COLORS[p.approvalStatus]}`}>
                      <Icon className="h-3 w-3" />
                      {p.approvalStatus.charAt(0).toUpperCase() + p.approvalStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <span>{p.serviceCategory}</span>
                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{p.location}</span>
                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{p.rating} ({p.reviewCount})</span>
                  </div>
                </div>

                {/* Plan badge */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    p.subscriptionPlan === 'pro' ? 'bg-accent/15 text-accent' :
                    p.subscriptionPlan === 'basic' ? 'bg-primary/15 text-primary' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {p.subscriptionPlan === 'none' ? 'Free' : p.subscriptionPlan.charAt(0).toUpperCase() + p.subscriptionPlan.slice(1)}
                  </span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      setExpandedId(isExpanded ? null : p.id)
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    {isExpanded ? 'Collapse' : 'Manage'}
                  </button>
                </div>
              </div>

              {/* Expanded management panel */}
              {isExpanded && (
                <div className="border-t border-border/50 bg-card/50 px-4 py-4 space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Experience</span>
                      <span className="font-medium">{p.experience}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Availability</span>
                      <span className="font-medium">{p.availability}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Est. Price Range</span>
                      <span className="font-medium text-accent">{p.estimatedPriceRange}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Oil & Gas Experience</span>
                      <span className={`font-medium ${p.oilGasExperience ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                        {p.oilGasExperience ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Portfolio Strength</span>
                      <span className="font-medium">{p.portfolioStrength}/10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Joined</span>
                      <span className="font-medium">{p.joinDate}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground text-xs block mb-1">Bio</span>
                    <p className="text-xs text-foreground/80 leading-relaxed">{p.bio}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {/* Approval actions */}
                    {p.approvalStatus !== 'approved' && (
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => updateProviderApproval(p.id, 'approved')}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                      </Button>
                    )}
                    {p.approvalStatus !== 'rejected' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs"
                        onClick={() => updateProviderApproval(p.id, 'rejected')}
                      >
                        <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                      </Button>
                    )}
                    {p.approvalStatus !== 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => updateProviderApproval(p.id, 'pending')}
                      >
                        <Clock className="h-3.5 w-3.5 mr-1" /> Set Pending
                      </Button>
                    )}

                    {/* Featured toggle */}
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-7 text-xs ${p.featured ? 'border-accent text-accent' : ''}`}
                      onClick={() => updateProviderFeatured(p.id, !p.featured)}
                    >
                      <Award className="h-3.5 w-3.5 mr-1" />
                      {p.featured ? 'Unfeature' : 'Feature'}
                    </Button>

                    {/* Subscription overrides */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => updateProviderSubscription(p.id, 'pro')}
                    >
                      <Shield className="h-3.5 w-3.5 mr-1" /> Grant Pro
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => updateProviderSubscription(p.id, 'none')}
                    >
                      Revoke Plan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
