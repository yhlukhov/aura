'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'
import { createChannelAction } from '@/actions/adminChannelActions'
import type { NewChannel } from '@/db/schema'

const countries = [
  'United Kingdom',
  'United States',
  'Ukraine',
  'Russia',
] satisfies NewChannel['country'][]

export function CreateChannelForm() {
  const [error, formAction, isPending] = useActionState(createChannelAction, null)

  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.eyebrow)}>
          <Link href='/'>AURA</Link>
          {' · '}
          <Link href='/admin'>ADMIN</Link>
        </p>
        <h1 {...stylex.props(styles.title)}>Create a channel</h1>
        <p {...stylex.props(styles.intro)}>
          Add a new space for inspiration and spiritual growth.
        </p>
      </header>

      <form action={formAction} {...stylex.props(styles.form)}>
        {error && (
          <div role='alert' {...stylex.props(styles.error)}>
            {error}
          </div>
        )}

        <div {...stylex.props(styles.fields)}>
          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Channel name</span>
            <input
              data-create-channel-input
              name='name'
              type='text'
              maxLength={255}
              autoComplete='organization'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Author</span>
            <input
              data-create-channel-input
              name='author'
              type='text'
              maxLength={255}
              autoComplete='name'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Channel URL</span>
            <input
              data-create-channel-input
              name='url'
              type='url'
              placeholder='https://'
              maxLength={255}
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Channel address</span>
            <input
              data-create-channel-input
              name='atAddress'
              type='text'
              maxLength={255}
              placeholder='@channel'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Card image URL</span>
            <input
              data-create-channel-input
              name='imageUrl'
              type='text'
              placeholder='https://… or /images/channel.jpg'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Top image URL</span>
            <input
              data-create-channel-input
              name='topImageUrl'
              type='text'
              placeholder='https://… or /images/cover.jpg'
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Country</span>
            <select
              data-create-channel-input
              name='country'
              defaultValue=''
              required
              {...stylex.props(styles.input, styles.select)}
            >
              <option value='' disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Language</span>
            <select
              data-create-channel-input
              name='language'
              defaultValue='silent'
              required
              {...stylex.props(styles.input, styles.select)}
            >
              <option value='silent'>Silent / no spoken language</option>
              <option value='english'>English</option>
              <option value='russian'>Russian</option>
              <option value='ukrainian'>Ukrainian</option>
            </select>
          </label>

          <label {...stylex.props(styles.field)}>
            <span {...stylex.props(styles.label)}>Channel creation date</span>
            <input
              data-create-channel-input
              name='createdAt'
              type='date'
              defaultValue={new Date().toISOString().slice(0, 10)}
              required
              {...stylex.props(styles.input)}
            />
          </label>

          <fieldset data-create-channel-pricing {...stylex.props(styles.fieldset)}>
            <legend {...stylex.props(styles.label)}>Pricing options</legend>
            <div {...stylex.props(styles.prices)}>
              <label {...stylex.props(styles.checkOption)}>
                <input
                  type='checkbox'
                  name='price'
                  value='free'
                  defaultChecked
                />
                <span>Free</span>
              </label>
              <label {...stylex.props(styles.checkOption)}>
                <input type='checkbox' name='price' value='membership' />
                <span>Membership</span>
              </label>
              <label {...stylex.props(styles.checkOption)}>
                <input type='checkbox' name='price' value='donation' />
                <span>Donation</span>
              </label>
            </div>
          </fieldset>

          <label {...stylex.props(styles.field, styles.fullWidth)}>
            <span {...stylex.props(styles.label)}>Description</span>
            <textarea
              data-create-channel-input
              name='description'
              rows={5}
              required
              {...stylex.props(styles.input, styles.textarea)}
            />
          </label>
        </div>

        <div {...stylex.props(styles.actions)}>
          <Link href='/admin' {...stylex.props(styles.cancel)}>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={isPending}
            {...stylex.props(styles.submit)}
          >
            {isPending ? 'Creating…' : 'Create channel'}
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
    marginBlockEnd: '8px',
    color: colors.warmBronze,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.16em',
  },
  title: {
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
    minHeight: '44px',
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
  select: {
    cursor: 'pointer',
  },
  textarea: {
    minHeight: '132px',
    resize: 'vertical',
    lineHeight: 1.55,
  },
  fieldset: {
    display: 'grid',
    gap: '8px',
    minWidth: 0,
    padding: 0,
    border: '1px solid rgba(129, 71, 110, 0.24)',
    borderRadius: '10px',
  },
  prices: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px 16px',
    minHeight: '36px',
    paddingBlock: '6px',
    paddingInline: '12px',
  },
  checkOption: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    color: colors.mutedPlum,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '14px',
    cursor: 'pointer',
    accentColor: colors.darkPink,
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
