import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from './env';
import { logger } from '../logger/logger';
import * as schema from '../db/schema';

// Lazy-initialised so the module can be imported without immediately connecting
let queryClient: ReturnType<typeof postgres>;

export const connectDb = async (): Promise<void> => {
  logger.info('[db] connectDb → entry');

  try {
    queryClient = postgres(config.databaseUrl, {
      max: 10,          // connection-pool size
      idle_timeout: 30, // seconds before idle connections are closed
    });

    // Verify connectivity with a lightweight round-trip query
    await queryClient`SELECT 1`;

    logger.info('[db] Database connection established successfully');
  } catch (error) {
    logger.error('[db] Failed to connect to the database', error instanceof Error ? error : new Error(String(error)));
    throw error; // bubble up so server.ts can abort startup
  }

  logger.info('[db] connectDb → exit');
};

// Export db after connectDb has been called.
// Accessing db before calling connectDb will throw an explicit error.
export const getDb = () => {
  if (!queryClient) {
    throw new Error('Database not initialised. Call connectDb() first.');
  }
  return drizzle(queryClient, { schema });
};

// For modules that import db directly (e.g., DAL files)
// Use `db` from `src/db/index.ts` in application code.
export let db: ReturnType<typeof getDb>;

export const initDb = async (): Promise<void> => {
  await connectDb();
  db = getDb();
};

