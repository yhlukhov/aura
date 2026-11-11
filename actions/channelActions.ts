import { db } from "@/db";
import { eq } from "drizzle-orm";
import { channels } from "@/db/schema";

export function getChannels(limit=12, offset=0) {
  return db.select().from(channels).limit(limit).offset(offset)
}

export function getChannel(id: number) {
  return db.query.channels.findFirst({
    where: eq(channels.id, id),
    with: { links: true, videos: true },
  });
}