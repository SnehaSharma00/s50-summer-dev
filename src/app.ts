import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { productsRouter } from './app/products/products.routes';
import { ApiSuccessResponse } from './utils/response.util';

export function createApp(): express.Application {
  const app: Application = express();

  // ─── Global Middleware ──────────────────────────────────────────────────────
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
  app.use(morgan('dev'));
  app.use((_req, _res, next) => {
    setTimeout(() => { next(); }, 5000);
  });//we need to pass this next function otherwise express will think that the middleware is incomplete or not properly handled
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // ─── Health Check ───────────────────────────────────────────────────────────
  app.get('/health', (_req, res) => { //req is unused but it's a callback function so we need to pass it to get to the other param res
    res.status(200).json(
      new ApiSuccessResponse( //class ApiSuccessResponse helps in standardizing the response format (data + message). we are using its constructor here
        { uptime: process.uptime(), timestamp: new Date().toISOString() },
        'Health check passed',
      )
    );
  });

  // ─── Module Routes ──────────────────────────────────────────────────────────
  app.use('/api/v1/products', productsRouter);

  // ─── Error Handling ─────────────────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
