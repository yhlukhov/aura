import { getChannel } from "@/actions/channelActions"
import { ChannelView } from "@/components/channel-view/channel-view"

export const instant = false

interface Props {
  params: Promise<{ id: string }>
}

export default async function ExistingChannel({ params }: Props) {
  const { id } = await params
  const channelId = Number(id)

  if (!Number.isSafeInteger(channelId) || channelId < 1) {
    return <ChannelView channel={undefined} emptyMessage="Invalid channel ID." />
  }

  const channel = await getChannel(channelId)

  return (
    <ChannelView
      channel={channel}
      editHref={`/admin/channel/${channelId}/edit`}
      showAddVideo
    />
  )
}