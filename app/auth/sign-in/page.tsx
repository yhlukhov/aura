'use client'

import { useActionState } from 'react'
import { signInWithEmail } from './actions'

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null)

  return (
    <form
      action={formAction}
    >
      <div>
        <h1>
          Sign in to your account
        </h1>
      </div>

      <div>
        <label
          htmlFor='email'
        >
          Email address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          placeholder='john@my-company.com'
        />
      </div>

      <div>
        <label
          htmlFor='password'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          placeholder='*****'
        />
      </div>

      {state?.error && (
        <div>
          {state.error}
        </div>
      )}

      <button
        type='submit'
        disabled={isPending}
      >
        Sign in
      </button>
    </form>
  )
}
