"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { Login } from '@/components/pages/Login'
import { Register } from '@/components/pages/Register'
import { UserRole } from '@/types'

export default function HomePage() {
  const { currentUser } = useAuthContext()
  const [view, setView] = useState<'login' | 'register'>('login')
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === UserRole.ADMIN) {
        router.push('/admin')
      } else {
        router.push('/supplier')
      }
    }
  }, [currentUser, router])

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (view === 'register') {
    return <Register setView={setView} />
  }

  return <Login setView={setView} />
}