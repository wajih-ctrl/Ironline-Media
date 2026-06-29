'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Building2, User, ShieldCheck, Zap, ArrowLeft, ArrowRight, Lock, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Role } from '@/lib/mock-data'

const ROLES = [
  {
    role: 'company' as const,
    icon: Building2,
    title: 'Oil & Gas Company',
    description: 'Post media projects and compare vetted creative providers across the Permian Basin.',
    email: 'travis@permianflow.com',
    password: 'demo123',
    cta: 'Login as Company',
    btnClass: 'bg-accent text-accent-foreground hover:bg-accent/90',
    iconBg: 'bg-accent/15',
    iconColor: 'text-accent',
  },
  {
    role: 'provider' as const,
    icon: User,
    title: 'Creative Provider',
    description: 'Access matched project opportunities, submit bids, and manage your provider profile.',
    email: 'hello@permiandronevisuals.com',
    password: 'demo123',
    cta: 'Login as Provider',
    btnClass: 'bg-primary text-primary-foreground hover:bg-primary/90',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
  },
  {
    role: 'admin' as const,
    icon: ShieldCheck,
    title: 'Ironline Admin',
    description: 'Manage users, providers, proposals, projects, subscriptions, analytics, and revenue.',
    email: 'admin@ironlinemedia.com',
    password: 'demo123',
    cta: 'Login as Admin',
    btnClass: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
]

export default function LoginPage() {
  const { setCurrentRole, setCurrentPage } = useAppStore()
  const [selectedRole, setSelectedRole] = useState<Role>('company')
  const selected = ROLES.find((item) => item.role === selectedRole) ?? ROLES[0]
  const [email, setEmail] = useState(selected.email)
  const [password, setPassword] = useState(selected.password)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function chooseRole(role: Role) {
    const next = ROLES.find((item) => item.role === role) ?? ROLES[0]
    setSelectedRole(role)
    setEmail(next.email)
    setPassword(next.password)
    setError('')
  }

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Enter an email and password to continue.')
      return
    }
    if (!email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }
    setLoading(true)
    setError('')
    setTimeout(() => {
      setCurrentRole(selectedRole)
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border/50 px-6 h-16 flex items-center justify-between bg-card/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-accent flex items-center justify-center">
            <Zap className="h-4 w-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Ironline <span className="text-accent">Media</span>
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setCurrentPage('landing')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-stretch">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Login / Role Selection</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Enter the Ironline marketplace</h1>
            <p className="text-muted-foreground mt-3">
              This is a mocked authentication flow for the prototype. Pick a role, use the demo credentials, and enter the matching dashboard.
            </p>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3 mt-8">
              {ROLES.map(({ role, icon: Icon, title, description, iconBg, iconColor }) => {
                const active = selectedRole === role
                return (
                  <button
                    key={role}
                    onClick={() => chooseRole(role)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      active ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`h-10 w-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{title}</h3>
                          {active && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-12 w-12 rounded-xl ${selected.iconBg} flex items-center justify-center`}>
                <selected.icon className={`h-6 w-6 ${selected.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Selected role</p>
                <h2 className="text-xl font-bold">{selected.title}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button className={`w-full ${selected.btnClass}`} onClick={handleLogin}>
                {loading ? 'Signing in...' : selected.cta}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Demo credentials</p>
              <div className="mt-3 grid gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role.role}
                    onClick={() => chooseRole(role.role)}
                    className="flex items-center justify-between gap-3 rounded-lg bg-card px-3 py-2 text-left text-xs hover:bg-muted"
                  >
                    <span className="font-semibold">{role.title}</span>
                    <span className="text-muted-foreground">{role.email} / {role.password}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-5">
              Prototype only: this validates locally and does not send credentials, emails, or passwords anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
