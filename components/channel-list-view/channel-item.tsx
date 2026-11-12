import Image from "next/image"
import stylex from '@stylexjs/stylex'
import { Channel } from "@/db/schema"
import { colors } from './tokens.stylex'

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: '0 1 360px',
    minHeight: '350px',
    overflow: 'hidden',
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
      default: '0 12px 32px -18px rgba(73, 52, 95, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.55)',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': '0 20px 48px -16px rgba(73, 52, 95, 0.45), 0 0 28px rgba(251, 191, 36, 0.3)',
      },
    },
    transitionProperty: 'transform, box-shadow, border-color',
    transitionDuration: {
      default: '400ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  imageWrapper: {
    position: 'relative',
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
    lineHeight: 1.5,
    color: colors.warmBronze,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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

export function ChannelItem({channel}: {channel: Channel}) {
  return (
    <article {...stylex.props(styles.card, stylex.defaultMarker())}>
      <div {...stylex.props(styles.imageWrapper)}>
        <Image
          src={channel.imageUrl}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, 400px"
          {...stylex.props(styles.image)}
        />
      </div>
      <div {...stylex.props(styles.body)}>
        <h3 {...stylex.props(styles.name)}>{channel.name}</h3>
        <h4 {...stylex.props(styles.author)}>{channel.atAddress}</h4>
        <div {...stylex.props(styles.description)}>{channel.description}</div>
      </div>
    </article>
  )
}
