import http from 'http';
import { createApp } from './app';
import { config } from './config/env';
import { logger } from './logger/logger';
import { initDb } from './config/db';

const startServer = async (): Promise<void> => {
  logger.info('[server] startServer → entry');

  // ─── 1. Connect to database ────────────────────────────────────────────────
  try {
    await initDb();
    logger.info('[server] Database ready');
  } catch (error) {
    logger.error('[server] Aborting startup: database connection failed', error instanceof Error ? error : new Error(String(error)));
    process.exit(1);
  }

  // ─── 2. Bootstrap Express app ─────────────────────────────────────────────
  const app = createApp();
  const server = http.createServer(app);

  server.listen(config.port, () => {
    logger.info(`[server] HTTP server running in ${config.nodeEnv} mode on port ${config.port}`);
    logger.info('[server] startServer → exit (server is now accepting connections)');
  });

  // ─── 3. Graceful shutdown ─────────────────────────────────────────────────
  const shutdown = (signal: string): void => {
    logger.warn(`[server] Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info('[server] HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('[server] Unhandled Promise Rejection', reason instanceof Error ? reason : new Error(String(reason)));
  });

  process.on('uncaughtException', (err: Error) => {
    logger.error('[server] Uncaught Exception — shutting down', err);
    process.exit(1);
  });
};

startServer();

