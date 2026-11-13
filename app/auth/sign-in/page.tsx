'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth/client'
import { FcGoogle } from 'react-icons/fc'
import stylex from '@stylexjs/stylex'
import { Header } from '@/components/channel-list-view/header'
import { Stars } from '@/components/channel-list-view/stars'
import { colors } from '@/components/channel-list-view/tokens.stylex'

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
    <main {...stylex.props(styles.root)}>
      <Stars />
      <div {...stylex.props(styles.content)}>
        <Header />
        <section
          aria-labelledby='sign-in-title'
          {...stylex.props(styles.card)}
        >
          <h2 {...stylex.props(styles.title)} id='sign-in-title'>
            Sign in
          </h2>
          <p {...stylex.props(styles.description)}>
            Use your Google account to continue to Aura Space.
          </p>
          <button
            type='button'
            onClick={signInWithGoogle}
            {...stylex.props(styles.googleButton)}
          >
            <FcGoogle aria-hidden='true' {...stylex.props(styles.googleIcon)} />
            <span>Sign In with Google</span>
          </button>
          {error && (
            <p role='alert' {...stylex.props(styles.error)}>
              {error.message ?? 'Failed to sign in. Try again'}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}

const styles = stylex.create({
  root: {
    position: 'relative',
    isolation: 'isolate',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    minHeight: '100vh',
    backgroundImage:
      'linear-gradient(180deg, rgba(224, 247, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 48%, rgba(255, 247, 204, 0.3) 100%), url("/bg-light.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 62%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    '@media (max-width: 700px)': {
      backgroundPosition: 'center center',
      backgroundAttachment: 'scroll',
    },
    color: colors.ink,
    paddingBlockStart: 'clamp(24px, 4vw, 48px)',
    paddingBlockEnd: '48px',
    paddingInline: 'clamp(16px, 4vw, 64px)',
    boxSizing: 'border-box',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '440px',
    padding: 'clamp(28px, 5vw, 40px)',
    borderRadius: '24px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(207, 182, 142, 0.5)',
    backgroundColor: colors.white,
    boxShadow:
      '0 12px 32px -18px rgba(73, 52, 95, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: 1.15,
    color: colors.darkPink,
  },
  description: {
    marginBlockStart: '10px',
    marginBlockEnd: '28px',
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '15px',
    lineHeight: 1.65,
    color: colors.mutedPlum,
  },
  googleButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    minHeight: '52px',
    paddingInline: '20px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'rgba(207, 182, 142, 0.7)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': colors.warmBronze,
      },
    },
    borderRadius: '12px',
    backgroundColor: colors.white,
    color: '#3c4043',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(73, 52, 95, 0.08)',
    transitionProperty: 'border-color, box-shadow, transform',
    transitionDuration: {
      default: '180ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'ease-out',
    ':focus-visible': {
      outline: `3px solid ${colors.skyDeep}`,
      outlineOffset: '3px',
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        boxShadow: '0 6px 16px rgba(73, 52, 95, 0.14)',
        transform: 'translateY(-1px)',
      },
    },
  },
  googleIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },
  error: {
    marginBlockStart: '16px',
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '14px',
    lineHeight: 1.5,
    color: '#b42318',
  },
})
