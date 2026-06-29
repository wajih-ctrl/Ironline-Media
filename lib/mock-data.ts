export type Role = 'company' | 'provider' | 'admin'
export type ProjectStatus = 'New' | 'Matched' | 'Proposal Received' | 'Awarded' | 'In Progress' | 'Delivered' | 'Completed'
export type SubscriptionPlan = 'none' | 'basic' | 'pro'
export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'past_due'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface Message {
  id: string
  sender: string
  role: 'company' | 'provider'
  text: string
  timestamp: string
}

export interface Deliverable {
  id: string
  title: string
  completed: boolean
}

export interface Proposal {
  id: string
  providerId: string
  providerName: string
  projectId: string
  price: number
  timeline: string
  message: string
  deliverables: string[]
  portfolioLinks: string[]
  questions: string
  status: 'submitted' | 'selected' | 'declined'
  submittedAt: string
  matchScore: number
}

export interface Project {
  id: string
  title: string
  companyId: string
  companyName: string
  serviceType: string
  industryCategory: string
  location: string
  budget: string
  deadline: string
  description: string
  urgency: string
  preferredProviderType: string
  status: ProjectStatus
  createdAt: string
  selectedProviderId?: string
  selectedProviderName?: string
  proposals: Proposal[]
  messages: Message[]
  deliverables: Deliverable[]
  invitedProviders: string[]
  files: string[]
}

export interface Provider {
  id: string
  name: string
  serviceCategory: string
  location: string
  bio: string
  experience: string
  oilGasExperience: boolean
  equipment: string[]
  specialties: string[]
  availability: string
  rating: number
  reviewCount: number
  portfolioImages: string[]
  pastProjects: string[]
  subscriptionPlan: SubscriptionPlan
  subscriptionStatus: SubscriptionStatus
  subscriptionRenewal: string
  approvalStatus: ApprovalStatus
  featured: boolean
  matchScore?: number
  estimatedPriceRange: string
  joinDate: string
  portfolioStrength: number
  monthlyOpportunityValue: number
}

export interface Company {
  id: string
  name: string
  contactName: string
  email: string
  location: string
  industryCategory: string
  status: 'active' | 'suspended' | 'verified'
  joinDate: string
  lastActivity: string
  projectsPosted: number
}

// ---- COMPANIES ----
export const COMPANIES: Company[] = [
  { id: 'c1', name: 'Permian Flow Services', contactName: 'Travis Holloway', email: 'travis@permianflow.com', location: 'Midland, TX', industryCategory: 'Pipeline Services', status: 'verified', joinDate: '2024-01-14', lastActivity: '2025-06-20', projectsPosted: 4 },
  { id: 'c2', name: 'LoneStar Pipeline Group', contactName: 'Derek Sandoval', email: 'derek@lonestarpipeline.com', location: 'Odessa, TX', industryCategory: 'Pipeline Services', status: 'active', joinDate: '2024-03-02', lastActivity: '2025-06-18', projectsPosted: 3 },
  { id: 'c3', name: 'West Texas Compression', contactName: 'Amanda Reyes', email: 'amanda@wtcompression.com', location: 'Midland, TX', industryCategory: 'Compressor Stations', status: 'verified', joinDate: '2024-02-11', lastActivity: '2025-06-21', projectsPosted: 5 },
  { id: 'c4', name: 'Midland Energy Fabrication', contactName: 'Clint Barker', email: 'clint@mefab.com', location: 'Midland, TX', industryCategory: 'Upstream Field Services', status: 'active', joinDate: '2024-04-07', lastActivity: '2025-06-15', projectsPosted: 2 },
  { id: 'c5', name: 'Odessa Field Services', contactName: 'Nora Castillo', email: 'nora@odessafield.com', location: 'Odessa, TX', industryCategory: 'Upstream Field Services', status: 'active', joinDate: '2024-05-19', lastActivity: '2025-06-10', projectsPosted: 3 },
  { id: 'c6', name: 'Basin Valve & Control', contactName: 'Greg Tillman', email: 'greg@basinvalve.com', location: 'Big Spring, TX', industryCategory: 'Oilfield Equipment', status: 'verified', joinDate: '2024-01-28', lastActivity: '2025-06-22', projectsPosted: 6 },
  { id: 'c7', name: 'Red Rock Midstream', contactName: 'Shelby Morris', email: 'shelby@redrockms.com', location: 'Pecos, TX', industryCategory: 'Midstream Operations', status: 'active', joinDate: '2024-06-03', lastActivity: '2025-06-19', projectsPosted: 2 },
  { id: 'c8', name: 'Delaware Basin Rentals', contactName: 'Joe Whitfield', email: 'joe@delawarerentals.com', location: 'Carlsbad, NM', industryCategory: 'Oilfield Equipment', status: 'suspended', joinDate: '2024-02-14', lastActivity: '2025-05-30', projectsPosted: 1 },
  { id: 'c9', name: 'Ranger Pipeline Services', contactName: 'Kayla Nguyen', email: 'kayla@rangerpipeline.com', location: 'Fort Stockton, TX', industryCategory: 'Pipeline Services', status: 'active', joinDate: '2024-07-08', lastActivity: '2025-06-17', projectsPosted: 3 },
  { id: 'c10', name: 'Black Mesa Energy Services', contactName: 'Marcus Webb', email: 'marcus@blackmesaenergy.com', location: 'Hobbs, NM', industryCategory: 'Upstream Field Services', status: 'verified', joinDate: '2024-03-25', lastActivity: '2025-06-23', projectsPosted: 4 },
]

// ---- PROVIDERS ----
export const PROVIDERS_INITIAL: Provider[] = [
  {
    id: 'p1',
    name: 'Permian Drone Visuals',
    serviceCategory: 'Drone Footage',
    location: 'Midland, TX',
    bio: 'Licensed drone operators specializing in pipeline right-of-way, tank battery overviews, and industrial facility documentation across the Permian Basin.',
    experience: '6 years',
    oilGasExperience: true,
    equipment: ['DJI Mavic 3 Enterprise', 'DJI Inspire 2', 'Thermal Camera Payload', 'FAA Part 107 Certified'],
    specialties: ['Pipeline ROW', 'Industrial Facility', 'Safety Inspection', 'Progress Documentation'],
    availability: 'Available This Week',
    rating: 4.9,
    reviewCount: 34,
    portfolioImages: ['/portfolio/drone1.jpg', '/portfolio/drone2.jpg', '/portfolio/drone3.jpg'],
    pastProjects: ['Permian Flow Services — Tank Battery Overview', 'Basin Valve — Compressor Station Aerial', 'LoneStar Pipeline — ROW Survey'],
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-15',
    approvalStatus: 'approved',
    featured: true,
    matchScore: 94,
    estimatedPriceRange: '$800–$2,400',
    joinDate: '2024-01-10',
    portfolioStrength: 95,
    monthlyOpportunityValue: 8400,
  },
  {
    id: 'p2',
    name: 'West Texas Field Media',
    serviceCategory: 'Videography & Photography',
    location: 'Odessa, TX',
    bio: 'Full-service industrial media production for oilfield service companies. We shoot in the field — from wellheads to compressor pads — and deliver broadcast-ready content.',
    experience: '8 years',
    oilGasExperience: true,
    equipment: ['Sony FX3', 'Canon EOS R5', 'Gimbal Stabilizer', 'Field Lighting Kit'],
    specialties: ['Field Crew Documentation', 'Short-Form Campaigns', 'Safety Culture Videos', 'Vendor Marketing'],
    availability: 'Available Next Week',
    rating: 4.7,
    reviewCount: 47,
    portfolioImages: [],
    pastProjects: ['West Texas Compression — Maintenance Campaign', 'Odessa Field Services — Crew Video Series'],
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-20',
    approvalStatus: 'approved',
    featured: true,
    matchScore: 91,
    estimatedPriceRange: '$1,200–$4,500',
    joinDate: '2024-02-08',
    portfolioStrength: 90,
    monthlyOpportunityValue: 12000,
  },
  {
    id: 'p3',
    name: 'Pipeline Lens Productions',
    serviceCategory: 'Video Editing',
    location: 'Midland, TX',
    bio: 'Post-production specialists focused on the energy sector. We transform raw field footage into polished content for LinkedIn, trade shows, and investor presentations.',
    experience: '5 years',
    oilGasExperience: true,
    equipment: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics Suite'],
    specialties: ['LinkedIn Video', 'Trade Show Reels', 'Investor Decks', 'Fast Turnaround'],
    availability: 'Available This Week',
    rating: 4.8,
    reviewCount: 28,
    portfolioImages: [],
    pastProjects: ['Ranger Pipeline — Campaign Video Edit', 'Red Rock Midstream — Investor Reel'],
    subscriptionPlan: 'basic',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-10',
    approvalStatus: 'approved',
    featured: false,
    matchScore: 88,
    estimatedPriceRange: '$600–$2,000',
    joinDate: '2024-03-15',
    portfolioStrength: 82,
    monthlyOpportunityValue: 5800,
  },
  {
    id: 'p4',
    name: 'Basin Creative Co.',
    serviceCategory: 'Graphic Design',
    location: 'Midland, TX',
    bio: 'Brand and design studio built for Permian Basin energy companies. We create field safety materials, vendor brochures, trade show graphics, and social media assets.',
    experience: '7 years',
    oilGasExperience: true,
    equipment: ['Adobe Creative Suite', 'Figma', 'Print Production'],
    specialties: ['Safety Campaign Design', 'Trade Brochures', 'Social Media Graphics', 'Brand Identity'],
    availability: 'Available This Week',
    rating: 4.6,
    reviewCount: 52,
    portfolioImages: [],
    pastProjects: ['Black Mesa Energy — Safety Campaign', 'Basin Valve & Control — Product Catalog'],
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-25',
    approvalStatus: 'approved',
    featured: false,
    matchScore: 85,
    estimatedPriceRange: '$500–$3,000',
    joinDate: '2024-01-22',
    portfolioStrength: 88,
    monthlyOpportunityValue: 7200,
  },
  {
    id: 'p5',
    name: 'Odessa Industrial Video',
    serviceCategory: 'Videography',
    location: 'Odessa, TX',
    bio: 'Industrial video production serving upstream and midstream operators. Safety-trained, OSHA-aware, and comfortable working in active oilfield environments.',
    experience: '4 years',
    oilGasExperience: true,
    equipment: ['BlackMagic Cinema Camera', 'DJI Ronin Gimbal', 'Wireless Audio'],
    specialties: ['Safety Training Videos', 'Upstream Documentation', 'Instagram Reels', 'Testimonials'],
    availability: 'Available In 2 Weeks',
    rating: 4.5,
    reviewCount: 19,
    portfolioImages: [],
    pastProjects: ['Midland Energy Fabrication — Shop Tour Video'],
    subscriptionPlan: 'basic',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-08',
    approvalStatus: 'pending',
    featured: false,
    matchScore: 82,
    estimatedPriceRange: '$900–$3,200',
    joinDate: '2024-05-01',
    portfolioStrength: 72,
    monthlyOpportunityValue: 4500,
  },
  {
    id: 'p6',
    name: 'RigSite Content Studio',
    serviceCategory: 'Social Media Content',
    location: 'San Angelo, TX',
    bio: 'Social media content agency focused exclusively on oilfield service companies. We create reels, posts, and campaigns that resonate with the energy sector audience.',
    experience: '3 years',
    oilGasExperience: true,
    equipment: ['iPhone Pro Cinema', 'Ring Light Kit', 'Content Calendar Software'],
    specialties: ['LinkedIn Strategy', 'Instagram Reels', 'Content Calendars', 'Copywriting'],
    availability: 'Available This Week',
    rating: 4.4,
    reviewCount: 23,
    portfolioImages: [],
    pastProjects: ['Delaware Basin Rentals — Monthly Content Package'],
    subscriptionPlan: 'none',
    subscriptionStatus: 'inactive',
    subscriptionRenewal: '',
    approvalStatus: 'pending',
    featured: false,
    matchScore: 78,
    estimatedPriceRange: '$400–$1,500',
    joinDate: '2024-06-12',
    portfolioStrength: 65,
    monthlyOpportunityValue: 3200,
  },
  {
    id: 'p7',
    name: 'Midland Media Works',
    serviceCategory: 'Photography',
    location: 'Midland, TX',
    bio: 'Commercial and industrial photography for energy companies. Equipment photos, facility documentation, crew portraits, and event coverage throughout West Texas.',
    experience: '9 years',
    oilGasExperience: true,
    equipment: ['Canon EOS R3', 'Studio Strobes', 'Wide Angle Lenses', 'Portable Studio Kit'],
    specialties: ['Industrial Photography', 'Equipment Catalogs', 'Event Coverage', 'Corporate Portraits'],
    availability: 'Available Next Week',
    rating: 4.8,
    reviewCount: 61,
    portfolioImages: [],
    pastProjects: ['Basin Valve & Control — Equipment Catalog Shoot', 'LoneStar Pipeline — Leadership Portraits'],
    subscriptionPlan: 'pro',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-30',
    approvalStatus: 'approved',
    featured: true,
    matchScore: 87,
    estimatedPriceRange: '$700–$2,800',
    joinDate: '2023-11-05',
    portfolioStrength: 92,
    monthlyOpportunityValue: 9600,
  },
  {
    id: 'p8',
    name: 'Energy Field Creators',
    serviceCategory: 'Event Coverage',
    location: 'Monahans, TX',
    bio: 'Full event production and coverage for oilfield networking events, trade shows, and safety milestones. Photo, video, and same-day social content delivery.',
    experience: '5 years',
    oilGasExperience: true,
    equipment: ['Multi-Camera Setup', 'Live Streaming Rig', 'Event Lighting'],
    specialties: ['Trade Show Coverage', 'Safety Milestone Events', 'Award Ceremonies', 'Live Streaming'],
    availability: 'Available In 3 Weeks',
    rating: 4.6,
    reviewCount: 17,
    portfolioImages: [],
    pastProjects: ['Permian Basin Oilfield Expo Coverage', 'West Texas Energy Summit'],
    subscriptionPlan: 'basic',
    subscriptionStatus: 'active',
    subscriptionRenewal: '2025-07-05',
    approvalStatus: 'approved',
    featured: false,
    matchScore: 79,
    estimatedPriceRange: '$1,500–$5,000',
    joinDate: '2024-04-20',
    portfolioStrength: 75,
    monthlyOpportunityValue: 6000,
  },
  {
    id: 'p9',
    name: 'Industrial Frame Studio',
    serviceCategory: 'Photography & Video',
    location: 'Pecos, TX',
    bio: 'Documentary-style industrial media. We capture the work your crews do every day and turn it into compelling content for recruitment, marketing, and operations.',
    experience: '6 years',
    oilGasExperience: true,
    equipment: ['Sony A7 IV', 'DJI Drone', 'Time-Lapse Rigs'],
    specialties: ['Recruitment Campaigns', 'Operational Documentation', 'Time-Lapse', 'Multi-Day Projects'],
    availability: 'Available Next Week',
    rating: 4.5,
    reviewCount: 31,
    portfolioImages: [],
    pastProjects: ['Red Rock Midstream — Pipeline Construction Time-Lapse'],
    subscriptionPlan: 'none',
    subscriptionStatus: 'inactive',
    subscriptionRenewal: '',
    approvalStatus: 'pending',
    featured: false,
    matchScore: 75,
    estimatedPriceRange: '$900–$3,500',
    joinDate: '2024-07-01',
    portfolioStrength: 70,
    monthlyOpportunityValue: 4200,
  },
  {
    id: 'p10',
    name: 'DroneWorks Permian',
    serviceCategory: 'Drone Footage',
    location: 'Hobbs, NM',
    bio: 'Precision aerial documentation for pipeline operators, compression facilities, and upstream producers across the Permian Basin and Delaware Basin.',
    experience: '4 years',
    oilGasExperience: true,
    equipment: ['DJI Matrice 350', 'RGB + LiDAR Payload', 'FAA Part 107'],
    specialties: ['LiDAR Survey', 'Pipeline Inspection', 'Facility Overview', 'Progress Mapping'],
    availability: 'Available This Week',
    rating: 4.7,
    reviewCount: 22,
    portfolioImages: [],
    pastProjects: ['Black Mesa Energy — Delaware Basin Survey'],
    subscriptionPlan: 'basic',
    subscriptionStatus: 'trial',
    subscriptionRenewal: '2025-07-01',
    approvalStatus: 'pending',
    featured: false,
    matchScore: 83,
    estimatedPriceRange: '$700–$2,200',
    joinDate: '2024-06-28',
    portfolioStrength: 68,
    monthlyOpportunityValue: 3800,
  },
]

// ---- PROJECTS ----
export const PROJECTS_INITIAL: Project[] = [
  {
    id: 'proj1',
    title: 'Drone Footage for Pipeline ROW Inspection',
    companyId: 'c1',
    companyName: 'Permian Flow Services',
    serviceType: 'Drone Footage',
    industryCategory: 'Pipeline Services',
    location: 'Midland, TX',
    budget: '$1,500–$3,000',
    deadline: '2025-07-15',
    description: 'Need comprehensive aerial drone footage of our 14-mile pipeline right-of-way segment in the Permian Basin. footage will be used for compliance documentation, investor updates, and internal operations review.',
    urgency: 'Normal',
    preferredProviderType: 'Drone Licensed Provider',
    status: 'Awarded',
    createdAt: '2025-06-01',
    selectedProviderId: 'p1',
    selectedProviderName: 'Permian Drone Visuals',
    invitedProviders: ['p1', 'p10'],
    files: ['pipeline_route_map.pdf', 'flight_zone_clearance.pdf'],
    proposals: [
      {
        id: 'prop1',
        providerId: 'p1',
        providerName: 'Permian Drone Visuals',
        projectId: 'proj1',
        price: 2200,
        timeline: '3 business days',
        message: 'We have extensive experience with pipeline ROW documentation across the Permian Basin. We can mobilize within 24 hours and deliver edited footage within 3 business days. Our Matrice 350 with RGB payload provides 4K footage ideal for compliance use.',
        deliverables: ['4K aerial footage (14-mile segment)', 'Georeferenced still frames every 500ft', 'Final edited video (5–8 min)', 'Raw footage archive'],
        portfolioLinks: ['permiandronevisuals.com/pipeline-work'],
        questions: 'Will we need to coordinate with pipeline operations crew for safety on-site?',
        status: 'selected',
        submittedAt: '2025-06-05',
        matchScore: 94,
      },
    ],
    messages: [
      { id: 'm1', sender: 'Travis Holloway', role: 'company', text: 'Hi, looking forward to getting started on this project. When can you mobilize?', timestamp: '2025-06-10 09:14 AM' },
      { id: 'm2', sender: 'Permian Drone Visuals', role: 'provider', text: 'We can be on-site Tuesday morning. We will need a safety orientation contact at the site entrance.', timestamp: '2025-06-10 10:32 AM' },
      { id: 'm3', sender: 'Travis Holloway', role: 'company', text: 'Perfect. I will send the site contact and gate code to your email.', timestamp: '2025-06-10 11:05 AM' },
    ],
    deliverables: [
      { id: 'd1', title: '4K aerial footage — 14-mile segment', completed: true },
      { id: 'd2', title: 'Georeferenced still frames every 500ft', completed: true },
      { id: 'd3', title: 'Final edited video (5–8 min)', completed: false },
      { id: 'd4', title: 'Raw footage archive delivered', completed: false },
    ],
  },
  {
    id: 'proj2',
    title: '10 Short Videos for Pipeline Service Campaign',
    companyId: 'c2',
    companyName: 'LoneStar Pipeline Group',
    serviceType: 'Videography',
    industryCategory: 'Pipeline Services',
    location: 'Odessa, TX',
    budget: '$3,000–$6,000',
    deadline: '2025-07-30',
    description: 'We need a series of 10 short-form videos (60–90 seconds each) showcasing our pipeline inspection, hydrostatic testing, and integrity management services for LinkedIn and our website.',
    urgency: 'Normal',
    preferredProviderType: 'Oil and Gas Experienced Provider',
    status: 'Proposal Received',
    createdAt: '2025-06-08',
    invitedProviders: ['p2', 'p5'],
    files: ['loneStar_brand_guidelines.pdf', 'video_brief.docx'],
    proposals: [
      {
        id: 'prop2',
        providerId: 'p2',
        providerName: 'West Texas Field Media',
        projectId: 'proj2',
        price: 4800,
        timeline: '2 weeks',
        message: 'We specialize in exactly this type of pipeline service content. Our team is OSHA-10 trained and comfortable working around active pipeline operations. We will produce 10 polished videos with B-roll, interviews, and motion graphics.',
        deliverables: ['10x 60–90 second final videos', 'Raw footage library', 'Vertical crop versions for Instagram', 'Thumbnail images for each video'],
        portfolioLinks: ['wtfieldmedia.com/pipeline-campaigns'],
        questions: 'Will we need full PPE for all shoot locations? Any confined space requirements?',
        status: 'submitted',
        submittedAt: '2025-06-15',
        matchScore: 91,
      },
    ],
    messages: [],
    deliverables: [],
  },
  {
    id: 'proj3',
    title: 'Field Photography for Compressor Station Maintenance',
    companyId: 'c3',
    companyName: 'West Texas Compression',
    serviceType: 'Photography',
    industryCategory: 'Compressor Stations',
    location: 'Midland, TX',
    budget: '$800–$2,000',
    deadline: '2025-07-10',
    description: 'Looking for a photographer to document our compressor station maintenance operations. Photos will be used for our annual report, website, and LinkedIn content.',
    urgency: 'Rush',
    preferredProviderType: 'Local West Texas Provider',
    status: 'Matched',
    createdAt: '2025-06-12',
    invitedProviders: ['p7'],
    files: [],
    proposals: [],
    messages: [],
    deliverables: [],
  },
  {
    id: 'proj4',
    title: 'Social Content Package for Permian Basin Service Launch',
    companyId: 'c6',
    companyName: 'Basin Valve & Control',
    serviceType: 'Social Media Content',
    industryCategory: 'Oilfield Equipment',
    location: 'Big Spring, TX',
    budget: '$1,000–$2,500',
    deadline: '2025-08-01',
    description: 'We are launching a new pressure control product line and need a 30-day social media content package including 12 LinkedIn posts, 8 Instagram reels, and a campaign launch graphic.',
    urgency: 'Normal',
    preferredProviderType: 'Any Qualified Provider',
    status: 'New',
    createdAt: '2025-06-18',
    invitedProviders: [],
    files: ['product_spec_sheet.pdf'],
    proposals: [],
    messages: [],
    deliverables: [],
  },
  {
    id: 'proj5',
    title: 'Event Coverage for Oilfield Networking Event',
    companyId: 'c10',
    companyName: 'Black Mesa Energy Services',
    serviceType: 'Event Coverage',
    industryCategory: 'Energy Events',
    location: 'Hobbs, NM',
    budget: '$2,000–$4,000',
    deadline: '2025-07-20',
    description: 'Need photo and video coverage of our annual oilfield networking event on July 18th. Approximately 300 attendees. Need same-day social delivery of 5–10 highlight clips.',
    urgency: 'Rush',
    preferredProviderType: 'Full Service Media Team',
    status: 'Proposal Received',
    createdAt: '2025-06-14',
    invitedProviders: ['p8'],
    files: ['event_schedule.pdf'],
    proposals: [
      {
        id: 'prop3',
        providerId: 'p8',
        providerName: 'Energy Field Creators',
        projectId: 'proj5',
        price: 3200,
        timeline: 'Same-day delivery',
        message: 'We cover oilfield networking events regularly in the Permian and Delaware Basin area. Our 2-person crew handles photo, video, and same-day social cuts simultaneously. We can deliver 5 Instagram highlight reels by 11PM the day of the event.',
        deliverables: ['Full event photo gallery (200+ edited images)', '5 Instagram highlight reels (30–60 sec)', 'Full highlight video (3–4 min)', 'Event recap LinkedIn post with graphics'],
        portfolioLinks: ['energyfieldcreators.com/events'],
        questions: 'Will there be a designated media room or press area at the venue?',
        status: 'submitted',
        submittedAt: '2025-06-17',
        matchScore: 79,
      },
    ],
    messages: [],
    deliverables: [],
  },
  {
    id: 'proj6',
    title: 'Graphic Design for Field Safety Campaign',
    companyId: 'c5',
    companyName: 'Odessa Field Services',
    serviceType: 'Graphic Design',
    industryCategory: 'Industrial Safety',
    location: 'Odessa, TX',
    budget: '$500–$1,500',
    deadline: '2025-07-25',
    description: 'Need a complete safety campaign design package — 6 safety posters, 4 social media graphics, and a field safety reminder card to distribute to field crews.',
    urgency: 'Normal',
    preferredProviderType: 'Any Qualified Provider',
    status: 'New',
    createdAt: '2025-06-20',
    invitedProviders: [],
    files: [],
    proposals: [],
    messages: [],
    deliverables: [],
  },
]

// Revenue and analytics mock data
export const REVENUE_DATA = [
  { month: 'Jan', mrr: 4200, providers: 62 },
  { month: 'Feb', mrr: 4850, providers: 71 },
  { month: 'Mar', mrr: 5100, providers: 78 },
  { month: 'Apr', mrr: 5600, providers: 85 },
  { month: 'May', mrr: 6200, providers: 91 },
  { month: 'Jun', mrr: 6850, providers: 99 },
]

export const SERVICE_DEMAND_DATA = [
  { service: 'Drone Footage', requests: 18 },
  { service: 'Videography', requests: 14 },
  { service: 'Photography', requests: 12 },
  { service: 'Social Content', requests: 9 },
  { service: 'Graphic Design', requests: 8 },
  { service: 'Video Editing', requests: 7 },
  { service: 'Event Coverage', requests: 6 },
]

export const PROVIDER_LOCATION_DATA = [
  { location: 'Midland, TX', count: 32 },
  { location: 'Odessa, TX', count: 28 },
  { location: 'Hobbs, NM', count: 15 },
  { location: 'Big Spring, TX', count: 12 },
  { location: 'San Angelo, TX', count: 11 },
  { location: 'Pecos, TX', count: 10 },
  { location: 'Other', count: 16 },
]

export const ACTIVITY_FEED = [
  { id: 1, type: 'subscription', text: 'Permian Drone Visuals upgraded to Pro Plan', time: '2 hours ago' },
  { id: 2, type: 'proposal', text: 'West Texas Field Media submitted proposal on Project #LPG-002', time: '4 hours ago' },
  { id: 3, type: 'project', text: 'Basin Valve & Control posted new Social Content project request', time: '6 hours ago' },
  { id: 4, type: 'approval', text: 'DroneWorks Permian submitted profile for approval', time: '1 day ago' },
  { id: 5, type: 'match', text: 'AI matched 3 providers for West Texas Compression photography project', time: '1 day ago' },
  { id: 6, type: 'award', text: 'Permian Flow Services awarded project to Permian Drone Visuals', time: '2 days ago' },
  { id: 7, type: 'subscription', text: 'RigSite Content Studio activated Basic Plan subscription', time: '2 days ago' },
  { id: 8, type: 'project', text: 'Black Mesa Energy Services posted Event Coverage request', time: '3 days ago' },
]
