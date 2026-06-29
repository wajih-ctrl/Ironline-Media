'use client'

import { useAppStore } from '@/lib/store'
import LandingPage from '@/components/landing/LandingPage'
import LoginPage from '@/components/auth/LoginPage'
import CompanyLayout from '@/components/company/CompanyLayout'
import ProviderLayout from '@/components/provider/ProviderLayout'
import AdminLayout from '@/components/admin/AdminLayout'

export default function Page() {
  const { currentRole, currentPage } = useAppStore()

  if (!currentRole) {
    if (currentPage === 'login') return <LoginPage />
    return <LandingPage />
  }

  if (currentRole === 'company') return <CompanyLayout />
  if (currentRole === 'provider') return <ProviderLayout />
  if (currentRole === 'admin') return <AdminLayout />

  return <LandingPage />
}
