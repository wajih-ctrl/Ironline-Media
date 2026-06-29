'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, Plus, Image as ImageIcon, Video, Film, X, CheckCircle, Star } from 'lucide-react'

const PORTFOLIO_ITEMS = [
  { id: 1, type: 'video', title: 'Pipeline ROW Aerial Survey — Permian Basin', client: 'Permian Flow Services', desc: 'Full 14-mile aerial documentation of pipeline ROW for compliance and investor reporting. Shot with DJI Matrice 350 at 4K.', tags: ['Pipeline', 'Compliance', 'Aerial'] },
  { id: 2, type: 'video', title: 'Tank Battery Complex Overview — Midland TX', client: 'Basin Valve & Control', desc: 'Multi-angle aerial coverage of tank battery complex including thermal overlay for safety documentation.', tags: ['Tank Battery', 'Safety', 'Thermal'] },
  { id: 3, type: 'image', title: 'Compressor Station Aerial Documentation', client: 'West Texas Compression', desc: 'Comprehensive aerial still documentation of compression facility for annual operations report.', tags: ['Compressor Station', 'Facility', 'Documentation'] },
  { id: 4, type: 'video', title: 'LiDAR Survey — Delaware Basin', client: 'Black Mesa Energy Services', desc: 'Precision LiDAR mapping survey for site development planning across 800 acres in the Delaware Basin.', tags: ['LiDAR', 'Survey', 'Delaware Basin'] },
  { id: 5, type: 'image', title: 'Pipeline Construction Progress Series', client: 'LoneStar Pipeline Group', desc: 'Weekly aerial progress documentation series tracking 8 miles of new pipeline construction.', tags: ['Construction', 'Progress', 'Pipeline'] },
  { id: 6, type: 'video', title: 'Midland Energy Fair Event Coverage', client: 'Midland Energy Fabrication', desc: 'Event aerial coverage for the annual Midland Energy Fair including crowd shots and vendor showcases.', tags: ['Event', 'Aerial', 'Coverage'] },
]

export default function ProviderPortfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'image'>('all')
  const [items, setItems] = useState(PORTFOLIO_ITEMS)
  const [uploaded, setUploaded] = useState(false)

  const filtered = items.filter(
    (item) => activeFilter === 'all' || item.type === activeFilter
  )

  function addPortfolioItem() {
    const next = {
      id: Date.now(),
      type: 'video',
      title: 'New Compressor Station Safety Reel',
      client: 'West Texas Compression',
      desc: 'Uploaded mock portfolio item for a field-safe video package with crew interviews and equipment B-roll.',
      tags: ['Safety', 'Compressor Station', 'Video'],
    }
    setItems((current) => [next, ...current])
    setUploaded(true)
    setTimeout(() => setUploaded(false), 2500)
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Showcase your best industrial media work</p>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 self-start sm:self-auto" onClick={addPortfolioItem}>
          <Upload className="h-4 w-4 mr-2" /> Upload Work
        </Button>
      </div>
      {uploaded && (
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700">
          Portfolio item added. Profile strength and portfolio count updated in this mock session.
        </div>
      )}

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Items', value: String(items.length), icon: Film },
          { label: 'Portfolio Strength', value: '95%', icon: CheckCircle },
          { label: 'Avg Rating', value: '4.9', icon: Star },
          { label: 'Profile Views', value: '142', icon: ImageIcon },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <div className="text-2xl font-bold mb-1">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'video', 'image'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all ${
              activeFilter === f
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'bg-muted/30 text-muted-foreground border border-border hover:border-muted-foreground/30'
            }`}
          >
            {f === 'all' ? 'All Work' : f === 'video' ? 'Videos' : 'Photos'}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all group">
            {/* Thumbnail */}
            <div className="aspect-video bg-muted/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
              {item.type === 'video'
                ? <Video className="h-10 w-10 text-primary/40 relative z-10" />
                : <ImageIcon className="h-10 w-10 text-primary/40 relative z-10" />
              }
              <div className="absolute top-2 right-2 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-0.5 text-xs text-white font-medium uppercase tracking-wider">
                {item.type}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-accent mb-2">{item.client}</p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Upload card */}
        <button onClick={addPortfolioItem} className="rounded-xl border-2 border-dashed border-border bg-card/50 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-muted/10 transition-all">
          <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center mb-3">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Add Portfolio Item</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Video, photo, or link</p>
        </button>
      </div>

      {/* Upload area */}
      <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-8 text-center">
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium text-muted-foreground mb-1">Drop files to upload</p>
        <p className="text-xs text-muted-foreground/60">MP4, MOV, JPG, PNG, PDF up to 500MB each</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={addPortfolioItem}>
          Browse Files
        </Button>
      </div>
    </div>
  )
}
