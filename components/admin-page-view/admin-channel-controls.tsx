import Link from 'next/link'
import stylex from '@stylexjs/stylex'
import { colors } from '@/components/channel-list-view/tokens.stylex'

export function AdminChannelControls() {
  return (
    <section {...stylex.props(styles.section)}>
      <Link href='/admin/new-channel' {...stylex.props(styles.link)}>
        New channel
      </Link>
    </section>
  )
}

const styles = stylex.create({
  section: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    paddingBlock: '8px',
    color: colors.darkPink,
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: 'large',
    fontWeight: 600,
    textDecoration: 'underline',
    textDecorationColor: 'rgba(129, 71, 110, 0.4)',
    textUnderlineOffset: '5px',
    transition: 'color 180ms ease, text-decoration-color 180ms ease',
    ':hover': {
      color: colors.goldDeep,
      textDecorationColor: colors.goldDeep,
    },
    ':focus-visible': {
      outline: '3px solid',
      outlineColor: colors.gold,
      outlineOffset: '3px',
    },
  },
})