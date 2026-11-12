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
    border: `3px solid ${colors.gold}`,
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
      default: `0 10px 24px -8px ${colors.goldDeep}`,
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': '0 20px 48px -16px rgba(73, 52, 95, 0.45), 0 0 28px rgba(251, 191, 36, 0.3)',
      },
    },
    transitionProperty: 'transform, box-shadow',
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
    fontSize: '20px',
    fontWeight: 800,
    color: colors.skyDeep,
  },
  author: {
    fontSize: '15px',
    fontWeight: 700,
    color: colors.greenDeep,
  },
  description: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: colors.ink,
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
