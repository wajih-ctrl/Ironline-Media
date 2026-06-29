'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Star, Shield, ArrowRight, AlertCircle } from 'lucide-react'

const PLANS = [
  {
    id: 'none' as const,
    name: 'Free',
    price: 0,
    priceLabel: '$0/mo',
    description: 'Basic profile listing, no proposal access',
    features: [
      'Provider profile listing',
      'Searchable in directory',
      'No matched project access',
      'No proposal submissions',
      'No featured placement',
    ],
    cta: 'Current Plan',
    color: 'border-border',
    badge: null,
  },
  {
    id: 'basic' as const,
    name: 'Basic',
    price: 50,
    priceLabel: '$50/mo',
    description: 'Matched opportunities + limited proposals',
    features: [
      'Access to matched project opportunities',
      'Up to 5 proposals per month',
      'Standard profile listing',
      'Project messaging',
      'Deliverable tracking',
    ],
    cta: 'Upgrade to Basic',
    color: 'border-primary/40',
    badge: null,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: 100,
    priceLabel: '$100/mo',
    description: 'Unlimited access + featured placement',
    features: [
      'All matched project opportunities',
      'Unlimited proposals',
      'Featured provider listing',
      'Priority match placement',
      'Portfolio showcase (6 items)',
      'Analytics & earnings reports',
    ],
    cta: 'Upgrade to Pro',
    color: 'border-accent/40',
    badge: 'Most Popular',
  },
]

export default function SubscriptionPage() {
  const { providers, updateProviderSubscription } = useAppStore()
  const provider = providers.find((p) => p.id === 'p1')
  const [confirmPlan, setConfirmPlan] = useState<typeof PLANS[0] | null>(null)
  const [upgraded, setUpgraded] = useState(false)

  function handleUpgrade(plan: typeof PLANS[0]) {
    if (plan.id === provider?.subscriptionPlan) return
    setConfirmPlan(plan)
  }

  function confirmUpgrade() {
    if (!confirmPlan) return
    updateProviderSubscription('p1', confirmPlan.id)
    setConfirmPlan(null)
    setUpgraded(true)
    setTimeout(() => setUpgraded(false), 3000)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Choose the plan that fits your business goals</p>
      </div>

      {/* Current status */}
      {provider && (
        <div className={`rounded-xl border p-5 flex items-center justify-between gap-4 ${
          provider.subscriptionPlan === 'pro' ? 'border-accent/30 bg-accent/5' :
          provider.subscriptionPlan === 'basic' ? 'border-primary/30 bg-primary/5' :
          'border-border bg-muted/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
              provider.subscriptionPlan === 'pro' ? 'bg-accent/15' :
              provider.subscriptionPlan === 'basic' ? 'bg-primary/15' :
              'bg-muted'
            }`}>
              <Zap className={`h-5 w-5 ${
                provider.subscriptionPlan === 'pro' ? 'text-accent' :
                provider.subscriptionPlan === 'basic' ? 'text-primary' :
                'text-muted-foreground'
              }`} />
            </div>
            <div>
              <div className="font-semibold capitalize">{provider.subscriptionPlan === 'none' ? 'Free Plan' : `${provider.subscriptionPlan} Plan`}</div>
              <div className="text-xs text-muted-foreground">
                Status: <span className={provider.subscriptionStatus === 'active' ? 'text-emerald-400' : 'text-muted-foreground'}>{provider.subscriptionStatus}</span>
                {provider.subscriptionRenewal && ` · Renews ${provider.subscriptionRenewal}`}
              </div>
            </div>
          </div>
          {upgraded && (
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle className="h-4 w-4" /> Plan updated!
            </div>
          )}
        </div>
      )}

      {/* Plans */}
      <div className="grid sm:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const isCurrent = provider?.subscriptionPlan === plan.id
          return (
            <div
              key={plan.id}
              className={`rounded-xl border bg-card flex flex-col transition-all relative ${
                isCurrent ? `${plan.color} ring-1 ring-accent/20` : plan.color
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent text-accent-foreground text-xs font-bold px-3 py-1">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="p-6 border-b border-border/50">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{plan.name}</div>
                <div className="text-3xl font-bold mb-1">{plan.priceLabel}</div>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </div>
              <div className="p-6 flex-1">
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${
                        plan.id === 'pro' ? 'text-accent' :
                        plan.id === 'basic' ? 'text-primary' :
                        'text-muted-foreground/50'
                      }`} />
                      <span className={plan.id === 'none' ? 'text-muted-foreground/60' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 border-t border-border/50">
                {isCurrent ? (
                  <Button className="w-full bg-muted text-muted-foreground cursor-default" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" /> Current Plan
                  </Button>
                ) : plan.id === 'none' ? (
              <Button variant="outline" className="w-full text-muted-foreground" onClick={() => handleUpgrade(plan)}>
                    Switch to Free
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.id === 'pro' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                    onClick={() => handleUpgrade(plan)}
                  >
                    {plan.cta} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* FAQ */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold">Subscription FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'When does billing start?', a: 'Your subscription activates immediately upon upgrade. You are billed monthly on the same date each month.' },
            { q: 'Can I downgrade?', a: 'Yes, you can downgrade at any time. Your access continues until the end of your billing period.' },
            { q: 'What counts as a proposal?', a: 'Each proposal submission to a client project counts as one proposal. Drafts do not count.' },
            { q: 'Is there a contract?', a: 'No contracts — Ironline subscriptions are month-to-month and cancel anytime.' },
          ].map((item) => (
            <div key={item.q} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{item.q}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm modal */}
      {confirmPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="rounded-xl border border-border bg-card p-6 max-w-md w-full shadow-2xl">
            <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-lg font-bold text-center mb-2">Change to {confirmPlan.name}?</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              This mocked billing change will update your provider account to <span className="text-foreground font-semibold">{confirmPlan.priceLabel}</span> immediately.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmPlan(null)}>Cancel</Button>
              <Button
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={confirmUpgrade}
              >
                Confirm Upgrade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
