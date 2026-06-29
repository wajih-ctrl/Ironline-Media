'use client'

import { useAppStore } from '@/lib/store'
import {
  ArrowRight,
  Zap,
  Shield,
  Star,
  Camera,
  Video,
  PlaneTakeoff,
  Palette,
  Film,
  Share2,
  Globe,
  Calendar,
  CheckCircle,
  Users,
  Briefcase,
  TrendingUp,
  MapPin,
  Award,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { icon: PlaneTakeoff, label: 'Drone Operators', desc: 'Pipeline ROW, facility overviews, industrial aerial', count: 28 },
  { icon: Video, label: 'Videographers', desc: 'Field crews, compressor stations, service campaigns', count: 34 },
  { icon: Camera, label: 'Photographers', desc: 'Equipment catalogs, corporate portraits, events', count: 41 },
  { icon: Palette, label: 'Graphic Designers', desc: 'Safety campaigns, brochures, brand identity', count: 22 },
  { icon: Film, label: 'Video Editors', desc: 'Pipeline campaigns, investor reels, LinkedIn content', count: 19 },
  { icon: Share2, label: 'Content Creators', desc: 'Social media, LinkedIn strategy, copywriting', count: 16 },
  { icon: Globe, label: 'Web & Content', desc: 'Website content, blog writing, digital assets', count: 12 },
  { icon: Calendar, label: 'Event Coverage', desc: 'Trade shows, networking events, safety milestones', count: 9 },
]

const STATS = [
  { value: '38', label: 'Oil & Gas Companies' },
  { value: '124', label: 'Vetted Providers' },
  { value: '94%', label: 'Avg AI Match Score' },
  { value: '$2.1M', label: 'Projects Facilitated' },
]

const HOW_IT_WORKS_COMPANY = [
  { step: '01', title: 'Post Your Project', desc: 'Describe your media need, budget, location, and timeline. Takes under 5 minutes.' },
  { step: '02', title: 'AI Matches Providers', desc: 'Our AI reviews your specs and surfaces the best-fit providers from our vetted network.' },
  { step: '03', title: 'Review & Select', desc: 'Compare proposals, portfolios, and pricing. Select the provider that fits your project.' },
  { step: '04', title: 'Collaborate & Deliver', desc: 'Manage your project, share files, and track progress in a dedicated workspace.' },
]

const HOW_IT_WORKS_PROVIDER = [
  { step: '01', title: 'Apply & Get Approved', desc: 'Submit your profile, portfolio, and oil and gas experience for review.' },
  { step: '02', title: 'Subscribe to Access', desc: 'Choose a plan to unlock matched opportunities and proposal submissions.' },
  { step: '03', title: 'Submit Proposals', desc: 'Respond to relevant projects with pricing, timeline, and relevant portfolio work.' },
  { step: '04', title: 'Win Projects & Grow', desc: 'Build your reputation in the Permian Basin energy media market.' },
]

const WHO_IT_IS_FOR = [
  {
    icon: Briefcase,
    title: 'Oil & Gas Companies',
    desc: 'Marketing teams, founders, commercial teams, suppliers, vendors, and service companies that need field-ready creative support.',
    tags: ['Post free project requests', 'Compare proposals', 'Manage workspaces'],
  },
  {
    icon: Users,
    title: 'Creative Providers',
    desc: 'Drone operators, videographers, photographers, editors, designers, content creators, and web/content freelancers.',
    tags: ['Subscribe for opportunities', 'Submit bids', 'Showcase industrial work'],
  },
  {
    icon: Shield,
    title: 'Ironline Media Admin',
    desc: 'The internal team that manages users, provider approvals, project requests, proposal activity, subscriptions, and revenue.',
    tags: ['Approve providers', 'Track MRR', 'Monitor marketplace activity'],
  },
]

export default function LandingPage() {
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)
  const setCurrentRole = useAppStore((s) => s.setCurrentRole)
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-auto rounded bg-accent flex items-center justify-center p-1">
              <img src="/Logo-2.jpeg" alt="Ironline Media" className="h-6 w-auto object-contain" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Ironline <span className="text-accent">Media</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => scrollTo('who-it-is-for')} className="hover:text-foreground transition-colors">Who It Is For</button>
            <button onClick={() => scrollTo('for-providers')} className="hover:text-foreground transition-colors">For Providers</button>
            <button onClick={() => scrollTo('categories')} className="hover:text-foreground transition-colors">Categories</button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setCurrentPage('login')}>
              Sign In
            </Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setCurrentPage('login')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background">
        <img
          src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=2200&q=85"
          alt="Industrial oil and gas facility at sunset"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-white/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-14 min-h-[calc(100vh-4rem)] flex items-center">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/75 px-4 py-1.5 text-sm text-accent font-semibold mb-6 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Permian Basin&apos;s Premier Industrial Media Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight mb-6 text-balance">
              Connect Oil & Gas<br />
              <span className="text-accent">Companies</span> With<br />
              Creative <span className="text-primary">Experts</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl text-pretty">
              Ironline Media is the only marketplace built exclusively for the energy sector. Post a project, get AI-matched with vetted drone operators, videographers, photographers, and content creators who understand oilfield work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-14 text-base"
                onClick={() => { setCurrentRole('company'); }}
              >
                Post a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/60 hover:border-primary/40 hover:text-primary font-semibold px-8 h-14 text-base"
                onClick={() => { setCurrentRole('provider'); }}
              >
                Join as a Provider
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
              {['Free for Oil & Gas Companies', 'AI-Powered Matching', 'Vetted Permian Providers', 'No Hidden Fees'].map((tag) => (
                <div key={tag} className="flex items-center gap-1.5 text-sm text-foreground/75">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">AI Match Console</p>
                  <h3 className="font-bold text-foreground">Pipeline Campaign Request</h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">94% ready</span>
              </div>
              <div className="grid grid-cols-4 gap-3 py-4">
                {[
                  ['8', 'matched'],
                  ['$4.8k', 'avg bid'],
                  ['2 days', 'first reply'],
                  ['$650', 'provider MRR'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-muted/70 p-3">
                    <div className="text-xl font-bold text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  ['Permian Drone Visuals', 'Drone Footage', '98%', 'Available this week'],
                  ['West Texas Field Media', 'Videography', '94%', 'OSHA-aware crew'],
                  ['Pipeline Lens Productions', 'Video Editing', '91%', 'Fast turnaround'],
                ].map(([name, service, score, note]) => (
                  <div key={name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{name.charAt(0)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-foreground">{name}</p>
                      <p className="text-xs text-muted-foreground">{service} - {note}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">{score}</p>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section id="who-it-is-for" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Who it is for</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Built for the people moving oilfield media work forward</h2>
          <p className="text-muted-foreground mt-3">
            Ironline Media connects oil and gas companies with trusted creative providers who understand industrial work, while giving the Ironline team a clear way to manage the marketplace.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {WHO_IT_IS_FOR.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROVIDER CATEGORIES */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Provider Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every creative service your energy company needs, from upstream field documentation to investor-ready campaign production.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-card/80 transition-all duration-200 cursor-pointer"
              onClick={() => setCurrentPage('login')}
            >
              <div className="h-10 w-10 rounded-lg bg-muted/60 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <cat.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{cat.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{cat.desc}</p>
              <div className="text-xs text-accent font-medium">{cat.count} providers available</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-border/50 bg-card/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Companies */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent font-medium mb-6">
                <Briefcase className="h-3.5 w-3.5" />
                For Oil & Gas Companies
              </div>
              <h2 className="text-2xl font-bold mb-2">Post projects for free</h2>
              <p className="text-muted-foreground mb-8">
                Oil and gas companies access the full marketplace at no cost. Post your media project and let our AI find the right creative team for your Permian Basin operation.
              </p>
              <div className="space-y-5">
                {HOW_IT_WORKS_COMPANY.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setCurrentRole('company')}
              >
                Start Posting Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {/* For Providers */}
            <div id="for-providers" className="scroll-mt-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary font-medium mb-6">
                <Users className="h-3.5 w-3.5" />
                For Creative Providers
              </div>
              <h2 className="text-2xl font-bold mb-2">Grow your energy sector business</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe monthly to access a consistent pipeline of qualified project opportunities matched to your service, location, and oil and gas experience.
              </p>
              <div className="space-y-5">
                {HOW_IT_WORKS_PROVIDER.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setCurrentRole('provider')}
                >
                  Join as a Provider
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Plans from</span>
                  <span className="font-semibold text-foreground">$50/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Built for the Permian Basin</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Generic creative agencies don&apos;t understand your world. Ironline Media only works with providers who have real industrial experience.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Vetted Industrial Experience',
              desc: 'Every provider is reviewed for oil and gas project history, safety awareness, and field-capable equipment before joining the marketplace.',
            },
            {
              icon: Zap,
              title: 'AI-Powered Matching',
              desc: 'Our matching engine evaluates service category, location, portfolio relevance, budget fit, and Permian Basin experience to surface the right providers.',
            },
            {
              icon: TrendingUp,
              title: 'Transparent Marketplace',
              desc: 'Compare proposals side by side. See real pricing, timelines, deliverables, and portfolio examples before you commit to any provider.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6">
              <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED LOCATIONS */}
      <section className="border-t border-border/50 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Active Across West Texas & Southeast NM</h2>
              <p className="text-muted-foreground">Providers covering all major Permian Basin markets</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Midland, TX', 'Odessa, TX', 'Big Spring, TX', 'Monahans, TX', 'Pecos, TX', 'Fort Stockton, TX', 'Carlsbad, NM', 'Hobbs, NM'].map((loc) => (
                <div key={loc} className="flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-accent" />
                  {loc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-10 md:p-16 text-center">
          <Award className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to elevate your<br />oilfield media presence?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join 38 oil and gas companies already using Ironline Media to find trusted creative professionals across the Permian Basin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-10 h-13"
              onClick={() => setCurrentRole('company')}
            >
              Post Your First Project — Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 font-semibold px-10"
              onClick={() => setCurrentRole('provider')}
            >
              Apply as a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-accent flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
            <span className="font-semibold text-sm">Ironline Media</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Ironline Media. The Premier Oil & Gas Creative Marketplace.
          </p>
          <Button variant="ghost" size="sm" onClick={() => setCurrentPage('login')} className="text-xs text-muted-foreground">
            Enter Platform &rarr;
          </Button>
        </div>
      </footer>
    </div>
  )
}
