import Image from 'next/image'
import stylex from '@stylexjs/stylex'
import { Channel } from '@/db/schema'
import { colors } from './tokens.stylex'
import Link from 'next/link'

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '360px',
    minWidth: 0,
    flex: '0 1 360px',
    minHeight: '350px',
    marginTop: '14px',
    borderRadius: '24px',
    backgroundColor: colors.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'rgba(207, 182, 142, 0.5)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'rgba(218, 179, 104, 0.7)',
      },
    },
    position: 'relative',
    zIndex: {
      default: 0,
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 2,
      },
    },
    transform: {
      default: 'scale(1)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'scale(1.05)',
      },
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    boxShadow: {
      default:
        '0 12px 32px -18px rgba(73, 52, 95, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.55)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover':
          '0 20px 48px -16px rgba(73, 52, 95, 0.45), 0 0 28px rgba(251, 191, 36, 0.3)',
      },
    },
    transitionProperty: 'transform, box-shadow, border-color',
    transitionDuration: {
      default: '400ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  stackLayer: {
    position: 'absolute',
    height: '32px',
    borderRadius: '22px 22px 0 0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(207, 182, 142, 0.5)',
    pointerEvents: 'none',
    boxShadow: '0 -2px 8px rgba(73, 52, 95, 0.06)',
  },
  stackNear: {
    top: '-7px',
    insetInline: '12px',
    zIndex: -1,
    backgroundColor: '#f5ede3',
    opacity: 0.7,
  },
  stackFar: {
    top: '-13px',
    insetInline: '24px',
    zIndex: -2,
    backgroundColor: '#e9dfea',
    opacity: 0.6,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '23px 23px 0 0',
    width: '100%',
    height: '180px',
    flexShrink: 0,
    backgroundImage: `linear-gradient(135deg, ${colors.sky}, ${colors.green})`,
  },
  image: {
    objectFit: 'cover',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '18px 20px 22px',
    flexGrow: 1,
  },
  name: {
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: '26px',
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.darkPink,
    overflowWrap: 'anywhere',
  },
  author: {
    fontFamily: 'var(--font-spiritual-italic), Georgia, serif',
    fontSize: '15px',
    fontStyle: 'italic',
    fontWeight: 500,
    textDecoration: 'underline',
    lineHeight: 1.5,
    color: colors.warmBronze,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transform: {
      default: 'scale(1)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'scale(1.05)',
      },
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    transformOrigin: 'left center',
    transitionProperty: 'transform',
    transitionDuration: {
      default: '250ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  description: {
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.65,
    color: colors.mutedPlum,
    overflowWrap: 'anywhere',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
})

export function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <article {...stylex.props(styles.card, stylex.defaultMarker())}>
      <div aria-hidden='true' {...stylex.props(styles.stackLayer, styles.stackFar)} />
      <div aria-hidden='true' {...stylex.props(styles.stackLayer, styles.stackNear)} />
      <Link
        href={`/channel/${channel.id}`}
        {...stylex.props(styles.imageWrapper)}
      >
        <Image
          src={channel.imageUrl}
          alt=''
          fill
          sizes='(max-width: 600px) 100vw, 400px'
          {...stylex.props(styles.image)}
        />
      </Link>
      <div {...stylex.props(styles.body)}>
        <Link href={`/channel/${channel.id}`}>
          <h3 {...stylex.props(styles.name)}>{channel.name}</h3>
        </Link>
        <Link href={channel.url} target='_blank'>
          <h4 {...stylex.props(styles.author)}>{channel.atAddress}</h4>
        </Link>
        <Link href={`/channel/${channel.id}`}>
          <div {...stylex.props(styles.description)}>{channel.description}</div>
        </Link>
      </div>
    </article>
  )
}
