'use client'

import { Header } from './header'
import type { Channel } from '@/db/schema'
import { ChannelList } from './channel-list'

export function ChannelListView({ channels }: { channels: Channel[] }) {
  return (
    <div>
      <Header />
      <ChannelList channels={channels} />
    </div>
  )
}
