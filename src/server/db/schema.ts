// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, type InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gallry_${name}`);

export const images = createTable("image", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  groupId: uuid("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
  isThumbnail: boolean("is_thumbnail").notNull(),
  publicId: varchar("public_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  admin: varchar("admin", { length: 256 }).notNull(),
  images: varchar("images", { length: 256 })
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  thumbnail: varchar("thumbnail", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ImageType = typeof images.$inferSelect;
export type GroupType = InferSelectModel<typeof groups>;
