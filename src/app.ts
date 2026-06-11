import express, { Application } from 'express';
import { requestLogger } from './middlewares/requestLogger';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { healthRouter } from './app/health/health.routes';

const createApp = (): Application => {
  const app = express();

  // Parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use(requestLogger);

  // ─── Routes ──────────────────────────────────────────────────────────────────
  app.use('/health', healthRouter);

  // ─── 404 & Error Handling ────────────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export { createApp };
