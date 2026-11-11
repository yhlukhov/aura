import Link from 'next/link'
import { Channel } from '@/db/schema'

interface Props {
  channels: Channel[]
}

export function ChannelList({ channels }: Props) {
  return (
    <section>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channel/${channel.id}`}>{channel.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
