'use client'

import { create } from 'zustand'
import {
  Role,
  Project,
  Provider,
  Company,
  Proposal,
  Message,
  PROJECTS_INITIAL,
  PROVIDERS_INITIAL,
  COMPANIES,
  ApprovalStatus,
  SubscriptionPlan,
} from './mock-data'

interface AppState {
  // Role / Auth
  currentRole: Role | null
  setCurrentRole: (role: Role) => void
  logout: () => void

  // Navigation
  currentPage: string
  setCurrentPage: (page: string) => void

  // Projects
  projects: Project[]
  addProject: (project: Project) => void
  updateProjectStatus: (projectId: string, status: Project['status']) => void
  selectProvider: (projectId: string, providerId: string, providerName: string) => void
  addMessage: (projectId: string, message: Message) => void
  toggleDeliverable: (projectId: string, deliverableId: string) => void
  addInvite: (projectId: string, providerId: string) => void

  // Proposals
  addProposal: (projectId: string, proposal: Proposal) => void

  // Providers
  providers: Provider[]
  updateProviderApproval: (providerId: string, status: ApprovalStatus) => void
  updateProviderFeatured: (providerId: string, featured: boolean) => void
  updateProviderSubscription: (providerId: string, plan: SubscriptionPlan) => void
  updateProviderProfile: (providerId: string, updates: Partial<Provider>) => void

  // Companies
  companies: Company[]
  updateCompanyStatus: (companyId: string, status: Company['status']) => void
  updateCompanyProfile: (companyId: string, updates: Partial<Company>) => void

  // Active project for workspace
  activeProjectId: string | null
  setActiveProjectId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: null,
  setCurrentRole: (role) => {
    const defaultPages: Record<Role, string> = {
      company: 'company-dashboard',
      provider: 'provider-dashboard',
      admin: 'admin-dashboard',
    }
    set({ currentRole: role, currentPage: defaultPages[role] })
  },
  logout: () => set({ currentRole: null, currentPage: 'login' }),

  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),

  projects: PROJECTS_INITIAL,
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  updateProjectStatus: (projectId, status) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId ? { ...p, status } : p
      ),
    })),
  selectProvider: (projectId, providerId, providerName) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              selectedProviderId: providerId,
              selectedProviderName: providerName,
              status: 'Awarded' as const,
              deliverables:
                p.deliverables.length > 0
                  ? p.deliverables
                  : (p.proposals.find((pr) => pr.providerId === providerId)?.deliverables ?? []).map((title, index) => ({
                      id: `deliverable-${Date.now()}-${index}`,
                      title,
                      completed: false,
                    })),
              proposals: p.proposals.map((pr) =>
                pr.providerId === providerId
                  ? { ...pr, status: 'selected' as const }
                  : { ...pr, status: 'declined' as const }
              ),
            }
          : p
      ),
    })),
  addMessage: (projectId, message) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, messages: [...p.messages, message] }
          : p
      ),
    })),
  toggleDeliverable: (projectId, deliverableId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              deliverables: p.deliverables.map((d) =>
                d.id === deliverableId ? { ...d, completed: !d.completed } : d
              ),
            }
          : p
      ),
    })),
  addInvite: (projectId, providerId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId && !p.invitedProviders.includes(providerId)
          ? {
              ...p,
              invitedProviders: [...p.invitedProviders, providerId],
              status: p.status === 'New' ? 'Matched' : p.status,
            }
          : p
      ),
    })),

  addProposal: (projectId, proposal) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              status: 'Proposal Received' as const,
              invitedProviders: p.invitedProviders.includes(proposal.providerId)
                ? p.invitedProviders
                : [...p.invitedProviders, proposal.providerId],
              proposals: p.proposals.some((existing) => existing.providerId === proposal.providerId)
                ? p.proposals.map((existing) =>
                    existing.providerId === proposal.providerId ? proposal : existing
                  )
                : [...p.proposals, proposal],
            }
          : p
      ),
    })),

  providers: PROVIDERS_INITIAL,
  updateProviderApproval: (providerId, status) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === providerId ? { ...p, approvalStatus: status } : p
      ),
    })),
  updateProviderFeatured: (providerId, featured) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === providerId ? { ...p, featured } : p
      ),
    })),
  updateProviderSubscription: (providerId, plan) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === providerId
          ? {
              ...p,
              subscriptionPlan: plan,
              subscriptionStatus: plan === 'none' ? 'inactive' : 'active',
              subscriptionRenewal:
                plan === 'none'
                  ? ''
                  : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split('T')[0],
            }
          : p
      ),
    })),
  updateProviderProfile: (providerId, updates) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === providerId ? { ...p, ...updates } : p
      ),
    })),

  companies: COMPANIES,
  updateCompanyStatus: (companyId, status) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === companyId ? { ...c, status } : c
      ),
    })),
  updateCompanyProfile: (companyId, updates) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === companyId ? { ...c, ...updates } : c
      ),
      projects: state.projects.map((p) =>
        p.companyId === companyId && updates.name
          ? { ...p, companyName: updates.name }
          : p
      ),
    })),

  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
}))
