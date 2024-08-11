// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql, type InferSelectModel } from "drizzle-orm";
import { pgTableCreator, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `friends-gallery_${name}`);

export const images = createTable("image", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  groupId: varchar("group_id", { length: 256 }).notNull(),
  publicId: varchar("public_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  admin: varchar("admin", { length: 256 }).notNull(),
  members: varchar("members", { length: 256 })
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  images: varchar("images", { length: 256 })
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const users = createTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  groups: varchar("groups", { length: 256 })
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const groupRelation = relations(groups, ({ many, one }) => ({
  "friends-gallery_image": many(images),
  "friends-gallery_user": many(users),
  "friends-gallery_admin": one(users, {
    fields: [groups.admin],
    references: [users.id],
  }),
}));

export const userRelation = relations(users, ({ many }) => ({
  "friends-gallery_group": many(groups),
  "friends-gallery_image": many(images),
}));

export const imageRelation = relations(images, ({ one }) => ({
  "friends-gallery_group": one(groups, {
    fields: [images.groupId],
    references: [groups.images],
  }),
  "friends-gallery_user": one(users, {
    fields: [images.groupId],
    references: [users.id],
  }),
}));

export type ImageType = typeof images.$inferSelect;
export type GroupType = InferSelectModel<typeof groups>;
export type UserType = InferSelectModel<typeof users>;
