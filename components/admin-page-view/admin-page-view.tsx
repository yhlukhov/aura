'use client'

import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth/client'
import { colors } from '@/components/channel-list-view/tokens.stylex'
import { Channel } from '@/db/schema'
import { AdminChannelList } from './admin-channel-list'
import { breadcrumb } from './breadcrumb.stylex'

type ErrorType = {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
}

export function AdminPageView({channels}: {channels: Channel[]}) {
  const router = useRouter()
  const [error, setError] = useState<ErrorType | null>(null)

  const handleSignOut = async () => {
    const { error } = await authClient.signOut({ callbackURL: '/auth/sign-in' })
    if (error) {
      setError(error)
    } else {
      router.refresh()
    }
  }

  return (
    <main {...stylex.props(styles.main)}>
      <header {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.eyebrow)}>
          <Link href='/' {...stylex.props(breadcrumb.link)}>
            AURA
          </Link>
        </p>
        <h1 {...stylex.props(styles.title)}>Admin Page</h1>
        <p {...stylex.props(styles.intro)}>
          Manage your channels and keep your community connected.
        </p>
      </header>
      <div {...stylex.props(styles.logout)}>
        <button
          type="button"
          data-admin-logout
          {...stylex.props(styles.logoutUrl)}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        {error && (
          <div role="alert" {...stylex.props(styles.error)}>
            {error.message ?? 'Failed to sign out'}
          </div>
        )}
      </div>
      <AdminChannelList channels={channels} />
    </main>
  )
}

const styles = stylex.create({
  main: {
    position: 'relative',
    display: 'grid',
    alignContent: 'start',
    justifyItems: 'center',
    boxSizing: 'border-box',
    minHeight: '100vh',
    padding: 'clamp(12px, 5vw, 24px)',
    color: colors.ink,
    backgroundImage:
      'linear-gradient(180deg, rgba(224, 247, 255, 0.55), rgba(255, 247, 204, 0.45))',
  },
  header: {
    width: 'min(100%, 760px)',
    marginInline: 'auto',
    marginBlockEnd: '28px',
    textAlign: 'center',
  },
  eyebrow: {
    marginBlockEnd: '8px',
    color: colors.warmBronze,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.16em',
  },
  title: {
    margin: 0,
    color: colors.darkPink,
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: 'clamp(32px, 6vw, 52px)',
    fontWeight: 600,
    lineHeight: 1.1,
  },
  intro: {
    color: colors.mutedPlum,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '16px',
    lineHeight: 1.5,
  },
  logout: {
    position: 'absolute',
    top: 'clamp(16px, 3vw, 32px)',
    right: 'clamp(16px, 3vw, 32px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    maxWidth: 'min(320px, calc(100vw - 32px))',
  },
  logoutUrl: {
    padding: 0,
    backgroundColor: 'transparent',
    color: colors.darkPink,
    font: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'underline',
    textDecorationColor: 'rgba(129, 71, 110, 0.4)',
    textUnderlineOffset: '5px',
    cursor: 'pointer',
    transition: 'color 180ms ease, text-decoration-color 180ms ease',
    ':hover': {
      color: colors.goldDeep,
      textDecorationColor: colors.goldDeep,
    },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
      borderRadius: '2px',
    },
  },
  error: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    border: '1px solid #f1a6a0',
    borderRadius: '8px',
    backgroundColor: '#fff1f0',
    color: '#b42318',
    fontSize: '14px',
    lineHeight: 1.4,
    overflowWrap: 'anywhere',
    textAlign: 'left',
  },
})