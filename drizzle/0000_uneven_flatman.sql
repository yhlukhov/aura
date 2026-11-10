CREATE TYPE "public"."channel_language" AS ENUM('silent', 'english', 'russian', 'ukrainian');--> statement-breakpoint
CREATE TYPE "public"."channel_price" AS ENUM('free', 'membership');--> statement-breakpoint
CREATE TABLE "channels" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" "channel_price" DEFAULT 'free',
	"yt_address" varchar(255) NOT NULL,
	"image_url" text NOT NULL,
	"top_image_url" text NOT NULL,
	"language" "channel_language" DEFAULT 'silent' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"channel_id" integer,
	"name" varchar(255) NOT NULL,
	"yt-address" varchar(255) NOT NULL,
	"image-url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;