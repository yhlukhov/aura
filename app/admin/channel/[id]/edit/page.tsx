import { getChannel } from "@/actions/channelActions"
import { ChannelView } from "@/components/channel-view/channel-view"

export const instant = false

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditChannel({params}:Props) {
  'use cache'
  const { id } = await params
    const channelId = Number(id)
  
    if (!Number.isSafeInteger(channelId) || channelId < 1) {
      return <ChannelView channel={undefined} emptyMessage="Invalid channel ID." />
    }
  
    const channel = await getChannel(channelId)
    
  return(
    <div>Edit Channel {channel?.name}</div>
  )
}