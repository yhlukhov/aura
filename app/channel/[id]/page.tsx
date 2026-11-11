import { getChannel } from '@/actions/channelActions'
import { ChannelView } from '@/components/channel-view/channel-view'

export const instant = false

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ChannelPage({ params }: Props) {
  const { id } = await params
  const channel = await getChannel(Number.parseInt(id))

  return <ChannelView channel={channel} />
}
