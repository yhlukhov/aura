import { db } from "@/db";
import { eq } from "drizzle-orm";
import { channels, NewChannel, videos, type NewVideo } from "@/db/schema";

export function getAllChannels() {
  return db.select().from(channels)
}

export function getChannels(limit=12, offset=0) {
  return db.select().from(channels).limit(limit).offset(offset)
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

export function addVideoToChannel(channelId: number, video: NewVideo) {
  return db.insert(videos).values({...video})
}