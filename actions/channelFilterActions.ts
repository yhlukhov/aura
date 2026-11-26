'use server'

import { getChannels } from '@/actions/channelActions'
import type { ChannelPageRequest } from '@/actions/channelActions'

export async function fetchChannelPage(request: ChannelPageRequest) {
  return getChannels(request)
}
