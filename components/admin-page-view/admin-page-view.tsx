'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth/client'

type ErrorType = {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
}

export function AdminPageView() {
  const router = useRouter()
  const [error, setError] = useState<ErrorType | null>(null)

  const handleSignOut = async () => {
    const { error } = await authClient.signOut({ callbackURL: '/auth/sign-in' })
    if (error) {
      setError(error)
    } else {
      router.push('/auth/sign-in')
    }
  }

  return (
    <div>
      <h2>Admin Page View</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      {error && <div>{error.message ?? 'Failed to sign out. Try again'}</div>}
    </div>
  )
}
