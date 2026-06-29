'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { CheckCircle, MapPin, Star, Zap, Edit2, Save, X } from 'lucide-react'

export default function ProviderProfilePage() {
  const { providers, updateProviderProfile } = useAppStore()
  const provider = providers.find((p) => p.id === 'p1')
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(provider?.bio ?? '')
  const [availability, setAvailability] = useState(provider?.availability ?? '')
  const [specialtiesInput, setSpecialtiesInput] = useState(provider?.specialties.join(', ') ?? '')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateProviderProfile('p1', {
      bio,
      availability,
      specialties: specialtiesInput.split(',').map((item) => item.trim()).filter(Boolean),
    })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!provider) return null

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {saved && (
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle className="h-4 w-4" /> Changes saved
          </div>
        )}
      </div>

      {/* Profile header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
            {provider.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{provider.name}</h2>
                <p className="text-muted-foreground text-sm">{provider.serviceCategory}</p>
              </div>
              <div className="flex items-center gap-2">
                {provider.featured && (
                  <span className="flex items-center gap-1 rounded-full bg-accent/15 border border-accent/30 px-2.5 py-1 text-xs text-accent font-medium">
                    <Zap className="h-3 w-3" /> Featured
                  </span>
                )}
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium border ${
                  provider.approvalStatus === 'approved'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                }`}>
                  {provider.approvalStatus}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{provider.location}</span>
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />{provider.rating} ({provider.reviewCount} reviews)</span>
              <span>{provider.experience} experience</span>
              <span className="text-primary capitalize">{provider.subscriptionPlan} plan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Bio */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Bio</h3>
            {!editing ? (
              <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => setEditing(true)}>
                <Edit2 className="h-3 w-3" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs gap-1 text-muted-foreground" onClick={() => { setEditing(false); setBio(provider.bio); setAvailability(provider.availability); setSpecialtiesInput(provider.specialties.join(', ')) }}>
                  <X className="h-3 w-3" /> Cancel
                </Button>
                <Button size="sm" className="text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSave}>
                  <Save className="h-3 w-3" /> Save
                </Button>
              </div>
            )}
          </div>
          {editing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 resize-none transition-colors"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
          )}
        </div>

        {/* Details */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-sm">Provider Details</h3>
          <div className="space-y-3">
            {editing && (
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors"
                >
                  <option>Available This Week</option>
                  <option>Available Next Week</option>
                  <option>Available In 2 Weeks</option>
                  <option>Booked This Month</option>
                </select>
              </div>
            )}
            {[
              { label: 'Experience', value: provider.experience },
              { label: 'Estimated Price Range', value: provider.estimatedPriceRange },
              { label: 'Availability', value: editing ? availability : provider.availability },
              { label: 'O&G Experience', value: provider.oilGasExperience ? 'Yes — verified' : 'Not specified' },
              { label: 'Member Since', value: provider.joinDate },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4 text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                <span className="text-muted-foreground shrink-0">{label}</span>
                <span className="font-medium text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-3">Specialties</h3>
          {editing ? (
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Services offered, separated by commas</label>
              <textarea
                value={specialtiesInput}
                onChange={(e) => setSpecialtiesInput(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/60 resize-none transition-colors"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((s) => (
                <span key={s} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Equipment */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-3">Equipment & Tools</h3>
          <ul className="space-y-1.5">
            {provider.equipment.map((e) => (
              <li key={e} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="text-muted-foreground">{e}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Past Projects */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-3">Past Oil & Gas Projects</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {provider.pastProjects.map((p) => (
              <div key={p} className="rounded-lg border border-border/50 bg-muted/20 px-4 py-2.5 text-sm text-muted-foreground">
                — {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
