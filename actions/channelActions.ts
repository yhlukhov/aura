import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  channels,
  countryEnum,
  languageEnum,
  NewChannel,
  links,
  videos,
  type NewLink,
  type NewVideo,
} from "@/db/schema";

export function getAllChannels() {
  return db.select().from(channels)
}

export async function getChannels(
  filters: { language?: string; country?: string } = {},
) {
  const language = languageEnum.enumValues.find(
    (option) => option === filters.language,
  )
  const country = countryEnum.enumValues.find(
    (option) => option === filters.country,
  )
  if (filters.language && !language) {
    throw new Error('Invalid channel language filter.')
  }
  if (filters.country && !country) {
    throw new Error('Invalid channel country filter.')
  }

  const conditions = []
  if (language) {
    conditions.push(eq(channels.language, language))
  }
  if (country) {
    conditions.push(eq(channels.country, country))
  }

  const query = db.select().from(channels)
  return conditions.length > 0
    ? query.where(and(...conditions)).limit(12).offset(0)
    : query.limit(12).offset(0)
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