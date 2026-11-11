'use client'

import Link from 'next/link'
import type { Channel } from '@/db/schema'

export function ChannelListView({ channels }: { channels: Channel[] }) {
  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link href={`/channel/${channel.id}`}>{channel.name}</Link>
        </li>
      ))}
    </ul>
  )
}
