import { randomUUID } from 'node:crypto'
import { connection } from 'next/server'
import { getChannels } from '@/actions/channelActions'
import { ChannelListView } from '@/components/channel-list-view/channel-list-view'
import { countryEnum, languageEnum } from '@/db/schema'

export const instant = false

export default async function Home() {
  await connection()
  const seed = randomUUID()
  const initialPage = await getChannels({
    seed,
    language: '',
    country: '',
    cursor: null,
  })

  return (
    <main>
      <ChannelListView
        initialPage={initialPage}
        seed={seed}
        countryOptions={countryEnum.enumValues}
        languageOptions={languageEnum.enumValues}
      />
    </main>
  )
}