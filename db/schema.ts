import {
  pgTable,
  pgEnum,
  serial,
  text,
  timestamp,
  integer,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const priceEnum = pgEnum('channel_price', ['free', 'membership'])
export const languageEnum = pgEnum('channel_language', [
  'silent',
  'english',
  'russian',
  'ukrainian',
])

// Таблиця каналів
export const channels = pgTable('channels', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: priceEnum('price').default('free'),
  ytAddress: varchar('yt_address', { length: 255 }).notNull(),
  imageUrl: text('image_url').notNull(),
  topImageUrl: text('top_image_url').notNull(),
  language: languageEnum('language').default('silent').notNull(),
  createdAt: timestamp('created_at').notNull(),
})

// Таблиця лінків
export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  channelId: integer('channel_id').references(() => channels.id, {
    onDelete: 'cascade',
  }),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('yt-address', { length: 255 }).notNull(),
  imageUrl: text('image-url').notNull(),
})

// Опис реляцій
export const channelsRelations = relations(channels, ({ many }) => ({
  links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
  channel: one(channels, {
    fields: [links.channelId],
    references: [channels.id],
  }),
}));