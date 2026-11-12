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
    boxShadow: `0 10px 24px -8px ${colors.skyDeep}`,
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
    ':hover': {
      transform: 'translateY(-6px)',
      boxShadow: `0 18px 32px -10px ${colors.greenDeep}`,
    },
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
    <article {...stylex.props(styles.card)}>
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
