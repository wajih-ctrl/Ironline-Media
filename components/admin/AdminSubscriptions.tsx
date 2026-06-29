'use client'

import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  CreditCard, Users, TrendingUp, DollarSign, Star, Zap, Shield, ChevronDown,
  CheckCircle, XCircle, AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'
import type { SubscriptionPlan, SubscriptionStatus } from '@/lib/mock-data'

const STATUS_COLORS: Record<SubscriptionStatus, string> = {
  active: 'bg-emerald-400/15 text-emerald-400',
  inactive: 'bg-muted text-muted-foreground',
  trial: 'bg-primary/15 text-primary',
  past_due: 'bg-destructive/15 text-destructive',
}

const STATUS_ICONS: Record<SubscriptionStatus, typeof CheckCircle> = {
  active: CheckCircle,
  inactive: XCircle,
  trial: Zap,
  past_due: AlertTriangle,
}

export default function AdminSubscriptions() {
  const { providers, updateProviderSubscription } = useAppStore()
  const [filterPlan, setFilterPlan] = useState<SubscriptionPlan | 'all'>('all')

  const proProviders = providers.filter((p) => p.subscriptionPlan === 'pro')
  const basicProviders = providers.filter((p) => p.subscriptionPlan === 'basic')
  const freeProviders = providers.filter((p) => p.subscriptionPlan === 'none')
  const pastDue = providers.filter((p) => p.subscriptionStatus === 'past_due')

  const mrr = proProviders.length * 100 + basicProviders.length * 50
  const arr = mrr * 12

  const filtered = providers.filter((p) =>
    filterPlan === 'all' || p.subscriptionPlan === filterPlan
  )

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Monitor and manage provider subscription plans</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">MRR</span>
          </div>
          <p className="text-2xl font-bold">${mrr.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 mt-1">+12% vs last month</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium">ARR</span>
          </div>
          <p className="text-2xl font-bold">${arr.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Annualized</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium">Paid Subscribers</span>
          </div>
          <p className="text-2xl font-bold">{proProviders.length + basicProviders.length}</p>
          <p className="text-xs text-muted-foreground mt-1">of {providers.length} total</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs font-medium">Past Due</span>
          </div>
          <p className="text-2xl font-bold">{pastDue.length}</p>
          <p className="text-xs text-destructive mt-1">Needs attention</p>
        </div>
      </div>

      {/* Plan breakdown */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Pro */}
        <div className="rounded-xl border border-accent/30 bg-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full" />
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Star className="h-4 w-4 text-accent" />
            </div>
            <span className="font-bold text-accent">Pro Plan</span>
          </div>
          <p className="text-3xl font-bold">{proProviders.length}</p>
          <p className="text-xs text-muted-foreground mt-1">subscribers at $100/mo</p>
          <p className="text-xs text-accent font-medium mt-2">${(proProviders.length * 100).toLocaleString()}/mo revenue</p>
        </div>

        {/* Basic */}
        <div className="rounded-xl border border-primary/30 bg-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-primary">Basic Plan</span>
          </div>
          <p className="text-3xl font-bold">{basicProviders.length}</p>
          <p className="text-xs text-muted-foreground mt-1">subscribers at $50/mo</p>
          <p className="text-xs text-primary font-medium mt-2">${(basicProviders.length * 50).toLocaleString()}/mo revenue</p>
        </div>

        {/* Free */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="font-bold text-muted-foreground">Free Tier</span>
          </div>
          <p className="text-3xl font-bold">{freeProviders.length}</p>
          <p className="text-xs text-muted-foreground mt-1">providers with no plan</p>
          <p className="text-xs text-muted-foreground font-medium mt-2">Conversion opportunity</p>
        </div>
      </div>

      {/* Subscriber list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">All Subscribers</h2>
          <div className="relative">
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as SubscriptionPlan | 'all')}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-card border border-border rounded-lg outline-none focus:border-primary/60 cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="pro">Pro</option>
              <option value="basic">Basic</option>
              <option value="none">Free</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left px-5 py-3.5 text-xs text-muted-foreground font-medium">Provider</th>
                  <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium">Plan</th>
                  <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden lg:table-cell">Renewal</th>
                  <th className="text-left px-4 py-3.5 text-xs text-muted-foreground font-medium hidden md:table-cell">Value</th>
                  <th className="px-4 py-3.5 text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filtered.map((p) => {
                  const StatusIcon = STATUS_ICONS[p.subscriptionStatus]
                  const monthlyValue = p.subscriptionPlan === 'pro' ? 100 : p.subscriptionPlan === 'basic' ? 50 : 0
                  return (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.serviceCategory}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.subscriptionPlan === 'pro' ? 'bg-accent/15 text-accent' :
                          p.subscriptionPlan === 'basic' ? 'bg-primary/15 text-primary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {p.subscriptionPlan === 'none' ? 'Free' : p.subscriptionPlan.charAt(0).toUpperCase() + p.subscriptionPlan.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 w-fit ${STATUS_COLORS[p.subscriptionStatus]}`}>
                          <StatusIcon className="h-3 w-3" />
                          {p.subscriptionStatus.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground hidden lg:table-cell">
                        {p.subscriptionRenewal || '—'}
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`text-xs font-medium ${monthlyValue > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                          {monthlyValue > 0 ? `$${monthlyValue}/mo` : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          {p.subscriptionPlan !== 'pro' && (
                            <button
                              onClick={() => updateProviderSubscription(p.id, 'pro')}
                              title="Upgrade to Pro"
                              className="p-1.5 rounded hover:bg-accent/10 text-accent transition-colors"
                            >
                              <Star className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {p.subscriptionPlan !== 'basic' && (
                            <button
                              onClick={() => updateProviderSubscription(p.id, 'basic')}
                              title="Set to Basic"
                              className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"
                            >
                              <Zap className="h-3.5 w-3.5" />
                            </button>
                          )}
                          {p.subscriptionPlan !== 'none' && (
                            <button
                              onClick={() => updateProviderSubscription(p.id, 'none')}
                              title="Revoke plan"
                              className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"
                            >
                              <XCircle className="h-3.5 w-3.5" />
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
    </div>
  )
}
