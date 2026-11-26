import { db } from "@/db";
import { asc, eq, getTableColumns, sql } from "drizzle-orm";
import {
 buildChannelConditions,
 parseChannelCountryFilter,
 parseChannelLanguageFilter,
 validateChannelOrderingSeed,
 validateChannelPaginationCursor,
 type ChannelCursor,
} from '@/actions/utils'
import {
 channels,
 NewChannel,
 links,
 videos,
 type Channel,
 type NewLink,
 type NewVideo,
} from "@/db/schema";

const CHANNEL_PAGE_SIZE = 12

export interface ChannelPage {
 channels: Channel[]
 nextCursor: ChannelCursor | null
 hasMore: boolean
}

export interface ChannelPageRequest {
 seed: string
 language: string
 country: string
 cursor: ChannelCursor | null
}

export function getAllChannels() {
 return db.select().from(channels)
}

export async function getChannels({
 seed,
 language: languageFilter,
 country: countryFilter,
 cursor,
}: ChannelPageRequest): Promise<ChannelPage> {
  validateChannelOrderingSeed(seed)
  const language = parseChannelLanguageFilter(languageFilter)
  const country = parseChannelCountryFilter(countryFilter)
  validateChannelPaginationCursor(cursor)

  const sortExpression = sql<string>`md5(${seed} || ':' || ${channels.id}::text)`
  const conditions = buildChannelConditions({
    language,
    country,
    cursor,
    sortExpression,
  })

  const rows = await db
    .select({ ...getTableColumns(channels), sortKey: sortExpression })
    .from(channels)
    .where(conditions)
    .orderBy(asc(sortExpression), asc(channels.id))
    .limit(CHANNEL_PAGE_SIZE + 1)

  const hasMore = rows.length > CHANNEL_PAGE_SIZE
  const pageRows = rows.slice(0, CHANNEL_PAGE_SIZE)
  const lastRow = pageRows.at(-1)

  return {
    channels: pageRows.map(({ sortKey: _sortKey, ...channel }) => channel),
    nextCursor:
      hasMore && lastRow
        ? { sortKey: lastRow.sortKey, id: lastRow.id }
        : null,
    hasMore,
  }
}

export function getChannel(id: number) {
  return db.query.channels.findFirst({
    where: eq(channels.id, id),
    with: { links: true, videos: true },
  });
}

export function createChannel(channel: NewChannel) {
  return db.insert(channels).values({
    ...channel
  }).returning({ id: channels.id })
}

export function updateChannel(id: number, channel: NewChannel) {
  return db.update(channels).set({
    ...channel
  }).where(eq(channels.id, id))
}

export function addVideoToChannel(channelId: number, video: NewVideo) {
  return db.insert(videos).values({...video})
}

export function addLinkToChannel(channelId: number, link: NewLink) {
  return db.insert(links).values({ ...link, channelId })
}