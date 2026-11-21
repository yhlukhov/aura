import Image from 'next/image'
import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import type { Channel } from '@/db/schema'
import { colors } from '../channel-list-view/tokens.stylex'

export function AdminChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/admin/channel/${channel.id}`}
      {...stylex.props(styles.card, stylex.defaultMarker())}
    >
      <div aria-hidden='true' {...stylex.props(styles.stackLayer, styles.stackFar)} />
      <div aria-hidden='true' {...stylex.props(styles.stackLayer, styles.stackNear)} />
      <div {...stylex.props(styles.imageWrapper)}>
        <Image
          src={channel.imageUrl}
          alt=''
          fill
          sizes='180px'
          {...stylex.props(styles.image)}
        />
      </div>
      <div {...stylex.props(styles.body)}>
        <h3 {...stylex.props(styles.name)}>{channel.name}</h3>
        <h4 {...stylex.props(styles.author)}>{channel.atAddress}</h4>
        <div {...stylex.props(styles.description)}>{channel.description}</div>
      </div>
    </Link>
  )
}

const styles = stylex.create({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '180px',
    minWidth: 0,
    flex: '0 1 180px',
    minHeight: '175px',
    marginTop: '7px',
    borderRadius: '12px',
    backgroundColor: colors.white,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'rgba(207, 182, 142, 0.5)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': 'rgba(218, 179, 104, 0.7)',
      },
    },
    color: 'inherit',
    textDecoration: 'none',
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: colors.goldDeep,
      outlineOffset: '3px',
    },
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
        '0 6px 16px -9px rgba(73, 52, 95, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.55)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover':
          '0 10px 24px -8px rgba(73, 52, 95, 0.45), 0 0 14px rgba(251, 191, 36, 0.3)',
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
    height: '16px',
    borderRadius: '11px 11px 0 0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(207, 182, 142, 0.5)',
    pointerEvents: 'none',
    boxShadow: '0 -1px 4px rgba(73, 52, 95, 0.06)',
  },
  stackNear: {
    top: '-4px',
    insetInline: '6px',
    zIndex: -1,
    backgroundColor: '#f5ede3',
    opacity: 0.7,
  },
  stackFar: {
    top: '-7px',
    insetInline: '12px',
    zIndex: -2,
    backgroundColor: '#e9dfea',
    opacity: 0.5,
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    height: '90px',
    flexShrink: 0,
    borderRadius: '11px 11px 0 0',
    backgroundImage: `linear-gradient(135deg, ${colors.sky}, ${colors.green})`,
  },
  image: {
    objectFit: 'cover',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    padding: '9px 10px 11px',
    flexGrow: 1,
  },
  name: {
    fontFamily: 'var(--font-spiritual-display), Georgia, serif',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.darkPink,
    overflowWrap: 'anywhere',
  },
  author: {
    fontFamily: 'var(--font-spiritual-italic), Georgia, serif',
    fontSize: '7.5px',
    fontStyle: 'italic',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.warmBronze,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  description: {
    fontFamily: 'var(--font-spiritual-classic), Georgia, serif',
    fontSize: '7.5px',
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