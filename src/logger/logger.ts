import winston from 'winston';
import { config } from '../config/env';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return stack
    ? `[${ts}] ${level}: ${message}\n${stack}`
    : `[${ts}] ${level}: ${message}`;
});

class Logger {
  private readonly instance: winston.Logger;

  constructor() {
    this.instance = winston.createLogger({
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
      format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        config.nodeEnv !== 'production' ? colorize() : winston.format.uncolorize(),
        logFormat,
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
  }

  info(message: string, meta?: object): void {
    this.instance.info(message, meta);
  }

  warn(message: string, meta?: object): void {
    this.instance.warn(message, meta);
  }

  error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      this.instance.error(message, { stack: error.stack });
    } else {
      this.instance.error(message, { error });
    }
  }

  debug(message: string, meta?: object): void {
    this.instance.debug(message, meta);
  }
}

export const logger = new Logger();
