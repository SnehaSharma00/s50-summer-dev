/**
 * src/db/schema.ts
 *
 * Central Drizzle ORM schema file.
 * Define ALL database tables here (or import & re-export from per-module schema files).
 * Drizzle Kit reads this file to generate and run migrations.
 */

import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      varchar('name',  { length: 255 }).notNull(),
  email:     varchar('email', { length: 255 }).notNull().unique(),
  password:  text('password').notNull(),
  isActive:  boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ─── Add more tables below as new modules are created ─────────────────────────
// Example:
// export const posts = pgTable('posts', { ... });
