import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
};
