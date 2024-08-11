CREATE TABLE IF NOT EXISTS "gallery_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"admin" varchar(256) NOT NULL,
	"images" varchar(256)[] DEFAULT ARRAY[]::text[] NOT NULL,
	"thumbnail" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "gallery_group_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gallery_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"group_id" varchar(256) NOT NULL,
	"public_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
