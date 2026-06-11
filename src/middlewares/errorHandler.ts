import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { ApiErrorResponse } from '../utils/ApiErrorResponse';
import { HttpStatus } from '../constants/httpStatus';
import { logger } from '../logger/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(`Error caught by errorHandler: ${err.message}`, err);

  if (err instanceof ValidationError) {
    const response = new ApiErrorResponse(err.message, err.statusCode, err.errors);
    res.status(err.statusCode).json(response);
    return;
  }

  if (err instanceof AppError && err.isOperational) {
    const response = new ApiErrorResponse(err.message, err.statusCode);
    res.status(err.statusCode).json(response);
    return;
  }

  // Unexpected / programmer errors
  logger.error('Unhandled non-operational error', err);
  const response = new ApiErrorResponse('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
};
