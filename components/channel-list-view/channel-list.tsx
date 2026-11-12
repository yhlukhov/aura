import stylex from '@stylexjs/stylex'
import { Channel } from '@/db/schema'
import { ChannelItem } from './channel-item'

const styles = stylex.create({
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
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  )
}
