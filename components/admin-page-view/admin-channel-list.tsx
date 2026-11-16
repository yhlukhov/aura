import * as stylex from '@stylexjs/stylex'
import type { Channel } from '@/db/schema'
import { AdminChannelItem } from './admin-channel-item'
import { AdminChannelControls } from './admin-channel-controls'

interface Props {
  channels: Channel[]
}

export function AdminChannelList({ channels }: Props) {
  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.controls)}>
        <AdminChannelControls />
      </div>
      <div {...stylex.props(styles.flex)}>
        <div aria-hidden='true' {...stylex.props(styles.backdrop)} />
        {channels.map((channel) => (
          <AdminChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  )
}

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
    display: 'grid',
    justifyItems: 'center',
    width: '100%',
  },
  controls: {
    width: 'min(100%, 1400px)',
    marginBlockEnd: 'clamp(16px, 2vw, 28px)',
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 'clamp(16px, 2vw, 28px)',
    width: 'min(100%, 1400px)',
  },
})