/**
 * src/db/index.ts
 *
 * Single entry-point for all database exports.
 * Import `db` and table schemas from this file anywhere in the codebase.
 *
 * Usage:
 *   import { db, users } from '../../db';
 */

// Re-export the Drizzle client
export { db } from '../config/db';

// Re-export all table schemas
export * from './schema';
