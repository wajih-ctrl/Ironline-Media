'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Building2, MapPin, Mail, Phone, Save, CheckCircle } from 'lucide-react'

export default function CompanyProfile() {
  const { companies, updateCompanyProfile } = useAppStore()
  const company = companies.find((c) => c.id === 'c1')
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: company?.name ?? 'Permian Flow Services',
    contact: company?.contactName ?? 'Travis Holloway',
    email: company?.email ?? 'travis@permianflow.com',
    phone: '(432) 555-0142',
    location: company?.location ?? 'Midland, TX',
    website: 'www.permianflow.com',
    industry: company?.industryCategory ?? 'Pipeline Services',
    description: 'Permian Flow Services provides full-service pipeline construction, inspection, and integrity management across the Permian Basin. We work with major operators and midstream companies throughout West Texas.',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function handleSave() {
    updateCompanyProfile('c1', {
      name: form.name,
      contactName: form.contact,
      email: form.email,
      location: form.location,
      industryCategory: form.industry,
      lastActivity: new Date().toISOString().split('T')[0],
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your company information visible to providers</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        {/* Avatar row */}
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-accent/15 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h2 className="font-bold text-lg">{form.name}</h2>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
              <MapPin className="h-3.5 w-3.5" />{form.location}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Company Name</label>
            <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Contact Name</label>
            <input type="text" value={form.contact} onChange={(e) => set('contact', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input type="text" value={form.location} onChange={(e) => set('location', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Industry</label>
            <input type="text" value={form.industry} onChange={(e) => set('industry', e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Company Description</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors resize-none" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className={saved ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary text-primary-foreground hover:bg-primary/90'} onClick={handleSave}>
          {saved ? <><CheckCircle className="h-4 w-4 mr-2" /> Saved!</> : <><Save className="h-4 w-4 mr-2" /> Save Profile</>}
        </Button>
      </div>
    </div>
  )
}
