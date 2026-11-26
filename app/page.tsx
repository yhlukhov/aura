import stylex from '@stylexjs/stylex'
import { getChannels } from '@/actions/channelActions'
import { ChannelListView } from '@/components/channel-list-view/channel-list-view'
import { countryEnum, languageEnum } from '@/db/schema'

export const instant = false

export default async function Home() {
  'use cache'
  const channels = await getChannels()

  return (
    <main {...stylex.props(styles.main)}>
      <ChannelListView
        channels={channels}
        countryOptions={countryEnum.enumValues}
        languageOptions={languageEnum.enumValues}
      />
    </main>
  )
}

//* Styles *//
const styles = stylex.create({
  main: {},
})