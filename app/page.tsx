import stylex from '@stylexjs/stylex'
import { getChannels } from '@/actions/channelActions'
import { ChannelListView } from '@/components/channel-list-view/channel-list-view'

export const instant = false

const styles = stylex.create({
  main: {},
})

export default async function Home() {
  'use cache'
  const channels = await getChannels()

  return (
    <main {...stylex.props(styles.main)}>
      <ChannelListView channels={channels} />
    </main>
  )
}
