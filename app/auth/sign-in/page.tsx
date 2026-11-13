'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth/client'

type LoginError = {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
} | null

export default function SignInForm() {
  const [error, setError] = useState<LoginError>(null)

  async function signInWithGoogle() {
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/admin',
    })
    if (error) {
      setError(error)
    }
  }

  return (
    <section>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      {error && <div>{error.message ?? 'Failed to sign in. Try again'}</div>}
    </section>
  )
}
