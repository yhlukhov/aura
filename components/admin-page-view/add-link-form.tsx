'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import * as stylex from '@stylexjs/stylex'
import { addLinkAction } from '@/actions/adminChannelActions'
import { colors } from '@/components/channel-list-view/tokens.stylex'
import type { Channel } from '@/db/schema'

export function AddLinkForm({ channel }: { channel: Channel }) {
  const [error, formAction, isPending] = useActionState(addLinkAction, null)

  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <nav aria-label='Breadcrumb' {...stylex.props(styles.eyebrow)}>
          <Link href='/'>AURA</Link>
          <span aria-hidden='true'>·</span>
          <Link href='/admin'>ADMIN</Link>
          <span aria-hidden='true'>·</span>
          <Link
            href={`/admin/channel/${channel.id}`}
            {...stylex.props(styles.breadcrumbChannel)}
          >
            {channel.name}
          </Link>
        </nav>
        <h1 {...stylex.props(styles.title)}>Add a link</h1>
        <p {...stylex.props(styles.intro)}>
          Add a link to{' '}
          <span {...stylex.props(styles.channelName)}>{channel.name}</span>
          {' '}links.
        </p>
      </header>

      <form action={formAction} {...stylex.props(styles.form)}>
        <input type='hidden' name='channelId' value={channel.id} />

        {error && (
          <div role='alert' {...stylex.props(styles.error)}>
            {error}
          </div>
        )}

        <div {...stylex.props(styles.fields)}>
          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Link name</span>
            <input
              data-add-link-input
              name='name'
              type='text'
              maxLength={255}
              autoComplete='off'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Link URL</span>
            <input
              data-add-link-input
              name='url'
              type='url'
              placeholder='https://'
              maxLength={255}
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field, styles.fullWidth)}>
            <span {...stylex.props(styles.label)}>Icon image URL</span>
            <input
              data-add-link-input
              name='imageUrl'
              type='text'
              placeholder='https://… or /images/icon.png'
              required
              {...stylex.props(styles.input)}
            />
            <span {...stylex.props(styles.help)}>
              Use an image URL or a path within this site.
            </span>
          </label>
        </div>

        <div {...stylex.props(styles.actions)}>
          <Link
            href={`/admin/channel/${channel.id}`}
            {...stylex.props(styles.cancel)}
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isPending}
            {...stylex.props(styles.submit)}
          >
            {isPending ? 'Adding…' : 'Add link'}
          </button>
        </div>
      </form>
    </main>
  )
}

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    paddingBlock: 'clamp(28px, 6vw, 64px)',
    paddingInline: 'clamp(16px, 5vw, 32px)',
    backgroundImage:
      'linear-gradient(180deg, rgba(224, 247, 255, 0.62), rgba(255, 247, 204, 0.54))',
    color: colors.ink,
  },
  header: {
    width: 'min(100%, 760px)',
    marginInline: 'auto',
    marginBlockEnd: '28px',
    textAlign: 'center',
  },
  eyebrow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBlockEnd: '8px',
    color: colors.warmBronze,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.16em',
  },
  breadcrumbChannel: {
    textTransform: 'capitalize',
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
    marginBlockStart: '10px',
    color: colors.mutedPlum,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '16px',
    lineHeight: 1.5,
  },
  channelName: {
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: '1.2em',
    fontWeight: 700,
  },
  form: {
    width: 'min(100%, 760px)',
    marginInline: 'auto',
    padding: 'clamp(18px, 4vw, 36px)',
    border: '1px solid rgba(207, 182, 142, 0.58)',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 20px 60px -36px rgba(73, 52, 95, 0.48)',
    backdropFilter: 'blur(10px)',
  },
  fields: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (max-width: 600px)': 'minmax(0, 1fr)',
    },
    gap: '18px',
  },
  field: {
    display: 'grid',
    gap: '7px',
    minWidth: 0,
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  label: {
    color: colors.darkPink,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '14px',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    height: '44px',
    boxSizing: 'border-box',
    paddingBlock: '10px',
    paddingInline: '12px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    color: colors.ink,
    font: 'inherit',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 160ms ease, box-shadow 160ms ease',
    ':focus': {
      borderColor: colors.darkPink,
      boxShadow: '0 0 0 3px rgba(129, 71, 110, 0.12)',
    },
    '::placeholder': {
      color: 'rgba(94, 82, 101, 0.62)',
    },
  },
  help: {
    color: colors.mutedPlum,
    fontSize: '13px',
    lineHeight: 1.4,
  },
  error: {
    marginBlockEnd: '20px',
    padding: '12px 14px',
    border: '1px solid rgba(180, 35, 24, 0.24)',
    borderRadius: '12px',
    backgroundColor: '#fff1f0',
    color: '#b42318',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px 20px',
    marginBlockStart: '24px',
  },
  cancel: {
    paddingBlock: '10px',
    color: colors.darkPink,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontWeight: 600,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    ':focus-visible': {
      outline: '3px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
  },
  submit: {
    minHeight: '44px',
    paddingBlock: '10px',
    paddingInline: '20px',
    border: '1px solid',
    borderColor: colors.darkPink,
    borderRadius: '999px',
    backgroundColor: colors.darkPink,
    color: colors.white,
    font: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
    transition:
      'background-color 160ms ease, color 160ms ease, opacity 160ms ease',
    ':hover': {
      backgroundColor: colors.white,
      color: colors.darkPink,
    },
    ':focus-visible': {
      outline: '3px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
    ':disabled': {
      opacity: 0.65,
      cursor: 'wait',
    },
  },
})
