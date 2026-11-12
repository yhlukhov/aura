import stylex from '@stylexjs/stylex'
import { Channel } from '@/db/schema'
import { ChannelItem } from './channel-item'

const styles = stylex.create({
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
    backgroundColor: 'rgba(40, 28, 56, 0.32)',
    opacity: {
      default: 0,
      '@media (hover: hover) and (pointer: fine)': {
        [stylex.when.anySibling(':hover')]: 1,
      },
    },
    transitionProperty: 'opacity',
    transitionDuration: {
      default: '400ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'clamp(24px, 2.5vw, 40px)',
    width: 'min(100%, 1400px)',
  },
})

interface Props {
  channels: Channel[]
}

export function ChannelList({ channels }: Props) {
  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.flex)}>
        <div aria-hidden="true" {...stylex.props(styles.backdrop)} />
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  )
}
