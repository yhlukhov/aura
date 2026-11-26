'use server'

import { getChannels } from '@/actions/channelActions'

export async function fetchFilteredChannels(filters: {
  language: string
  country: string
}) {
  return getChannels(filters)
}
