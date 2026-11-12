import stylex from '@stylexjs/stylex'
import { colors } from './tokens.stylex'

export function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <h1 {...stylex.props(styles.title)}>Aura Space</h1>
      <h2 {...stylex.props(styles.subtitle)}>
        Простір духовних практик та медитацій
      </h2>
      <h3 {...stylex.props(styles.tagline)}>
        A Journey of Self-Awareness and Spiritual Growth
      </h3>
    </header>
  )
}

//* Styles *//
const styles = stylex.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '12px',
    marginBottom: '40px',
  },
  title: {
    fontSize: 'clamp(40px, 7vw, 88px)',
    fontFamily: 'var(--font-spiritual-display), serif',
    fontWeight: 600,
    letterSpacing: '-0.025em',
    lineHeight: 1.05,
    color: colors.darkPink,
    textShadow:
      '0 2px 0 rgba(251, 191, 36, 0.75), 0 4px 12px rgba(255, 255, 255, 0.75)',
  },
  subtitle: {
    fontSize: 'clamp(19px, 2.4vw, 26px)',
    fontFamily: 'var(--font-spiritual-italic), serif',
    fontStyle: 'italic',
    letterSpacing: {
      default: '1px',
      '@media (min-width: 800px)': '2px',
    },
    fontWeight: 500,
    lineHeight: 1.15,
    color: colors.goldDeep,
  },
  tagline: {
    fontSize: 'clamp(13px, 1.6vw, 18px)',
    fontFamily: 'var(--font-spiritual-classic), serif',
    fontWeight: 500,
    letterSpacing: '0.045em',
    lineHeight: 1.3,
    color: colors.ink,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
})