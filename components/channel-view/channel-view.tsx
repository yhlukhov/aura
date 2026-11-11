'use client'

import type { Channel } from "@/db/schema"

export function ChannelView({ channel }: { channel: Channel|undefined }) {
  if(!channel) {
    return <ChannelNotFound />
  }
  return <div>
    <h1>Channel Details:</h1>
    <div>Channel Name: {channel.name}</div>
    <div>Channel Id: {channel.id}</div>
  </div>
}

function ChannelNotFound() {
  return <div>
    Channel not found...
  </div>
}