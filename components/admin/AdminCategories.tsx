'use client'

import { useState } from 'react'
import {
  PlaneTakeoff,
  Video,
  Camera,
  Palette,
  Film,
  Share2,
  Globe,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  label: string
  description: string
  icon: typeof Camera
  providerCount: number
  activeProjects: number
  enabled: boolean
  color: string
}

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    label: 'Drone Operators',
    description: 'Pipeline ROW, facility overviews, industrial aerial photography and video',
    icon: PlaneTakeoff,
    providerCount: 28,
    activeProjects: 7,
    enabled: true,
    color: 'text-sky-400',
  },
  {
    id: 'cat-2',
    label: 'Videographers',
    description: 'Field crew documentation, compressor stations, safety and service campaigns',
    icon: Video,
    providerCount: 34,
    activeProjects: 11,
    enabled: true,
    color: 'text-violet-400',
  },
  {
    id: 'cat-3',
    label: 'Photographers',
    description: 'Equipment catalogs, corporate portraits, facility and event photography',
    icon: Camera,
    providerCount: 41,
    activeProjects: 9,
    enabled: true,
    color: 'text-emerald-400',
  },
  {
    id: 'cat-4',
    label: 'Graphic Designers',
    description: 'Safety campaigns, brochures, brand identity and signage for energy companies',
    icon: Palette,
    providerCount: 22,
    activeProjects: 5,
    enabled: true,
    color: 'text-pink-400',
  },
  {
    id: 'cat-5',
    label: 'Video Editors',
    description: 'Pipeline campaigns, investor reels, LinkedIn content and social video',
    icon: Film,
    providerCount: 19,
    activeProjects: 6,
    enabled: true,
    color: 'text-orange-400',
  },
  {
    id: 'cat-6',
    label: 'Content Creators',
    description: 'Social media management, LinkedIn strategy and copywriting for O&G brands',
    icon: Share2,
    providerCount: 16,
    activeProjects: 4,
    enabled: true,
    color: 'text-yellow-400',
  },
  {
    id: 'cat-7',
    label: 'Web & Content',
    description: 'Website content writing, blog posts, and digital asset creation',
    icon: Globe,
    providerCount: 12,
    activeProjects: 3,
    enabled: true,
    color: 'text-cyan-400',
  },
  {
    id: 'cat-8',
    label: 'Event Coverage',
    description: 'Trade shows, networking events, safety milestones and field celebrations',
    icon: Calendar,
    providerCount: 9,
    activeProjects: 2,
    enabled: false,
    color: 'text-rose-400',
  },
]

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const toggleEnabled = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    )
  }

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setEditLabel(cat.label)
    setEditDesc(cat.description)
  }

  const saveEdit = () => {
    if (!editLabel.trim()) return
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingId
          ? { ...c, label: editLabel.trim(), description: editDesc.trim() }
          : c
      )
    )
    setEditingId(null)
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const addCategory = () => {
    if (!newLabel.trim()) return
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      label: newLabel.trim(),
      description: newDesc.trim(),
      icon: Tag,
      providerCount: 0,
      activeProjects: 0,
      enabled: true,
      color: 'text-muted-foreground',
    }
    setCategories((prev) => [...prev, newCat])
    setNewLabel('')
    setNewDesc('')
    setShowAddForm(false)
  }

  const enabledCount = categories.filter((c) => c.enabled).length
  const totalProviders = categories.reduce((sum, c) => sum + c.providerCount, 0)
  const totalProjects = categories.reduce((sum, c) => sum + c.activeProjects, 0)

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Service Categories</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage the creative service categories available on the marketplace
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
          onClick={() => setShowAddForm((v) => !v)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Categories', value: categories.length },
          { label: 'Active Categories', value: enabledCount },
          { label: 'Total Providers', value: totalProviders },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add category form */}
      {showAddForm && (
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
          <h3 className="font-semibold text-sm mb-4 text-accent">New Category</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Category Name</label>
              <input
                type="text"
                placeholder="e.g. 3D Visualization"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Description</label>
              <input
                type="text"
                placeholder="Short description for company search..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={addCategory}
                disabled={!newLabel.trim()}
              >
                Add Category
              </Button>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => { setShowAddForm(false); setNewLabel(''); setNewDesc('') }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Category list */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const isEditing = editingId === cat.id
          return (
            <div
              key={cat.id}
              className={cn(
                'rounded-xl border bg-card transition-all duration-200',
                cat.enabled ? 'border-border' : 'border-border/40 opacity-60'
              )}
            >
              {isEditing ? (
                <div className="p-5 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Category Name</label>
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg outline-none focus:border-primary/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Description</label>
                      <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg outline-none focus:border-primary/60"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={saveEdit}
                    >
                      Save Changes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      'h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0',
                      cat.color
                    )}
                  >
                    <cat.icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm">{cat.label}</span>
                      {!cat.enabled && (
                        <span className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                      {cat.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6 shrink-0 text-center">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{cat.providerCount}</div>
                      <div className="text-xs text-muted-foreground">Providers</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{cat.activeProjects}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleEnabled(cat.id)}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        cat.enabled
                          ? 'text-emerald-400 hover:bg-emerald-400/10'
                          : 'text-muted-foreground hover:bg-muted/50'
                      )}
                      title={cat.enabled ? 'Disable category' : 'Enable category'}
                    >
                      {cat.enabled ? (
                        <ToggleRight className="h-5 w-5" />
                      ) : (
                        <ToggleLeft className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      title="Edit category"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Tag className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No categories yet</p>
          <p className="text-sm mt-1">Add your first service category above.</p>
        </div>
      )}
    </div>
  )
}
