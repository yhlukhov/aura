import stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'

const styles = stylex.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '12px',
    paddingBlockEnd: '40px',
  },
  title: {
    fontSize: 'clamp(40px, 7vw, 88px)',
    fontFamily: 'var(--font-spiritual-display), serif',
    fontWeight: 600,
    letterSpacing: '-0.025em',
    lineHeight: 1.05,
    color: colors.skyDeep,
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.4vw, 26px)',
    fontFamily: 'var(--font-spiritual-italic), serif',
    fontStyle: 'italic',
    fontWeight: 500,
    lineHeight: 1.15,
    color: colors.goldDeep,
  },
  tagline: {
    fontSize: 'clamp(14px, 1.6vw, 18px)',
    fontFamily: 'var(--font-spiritual-classic), serif',
    fontWeight: 500,
    letterSpacing: '0.045em',
    lineHeight: 1.3,
    color: colors.ink,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
})

export function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <h1 {...stylex.props(styles.title)}>Aura Space</h1>
      <h2 {...stylex.props(styles.subtitle)}>
        A Practical Guide to Spiritual Awakening
      </h2>
      <h3 {...stylex.props(styles.tagline)}>
        A Journey of Self-Awareness and Spiritual Growth
      </h3>
    </header>
  )
}
