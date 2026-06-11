import { Request, Response } from 'express';
import { logger } from '../../logger/logger';
import { ApiSuccessResponse } from '../../utils/ApiSuccessResponse';
import { GetHealthDto } from './dto/get-health.dto';

export const getHealth = (_req: Request, res: Response): void => {
  logger.info('[health.controller] getHealth → entry');

  const data: GetHealthDto = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  const response = new ApiSuccessResponse<GetHealthDto>(data, 'Server is healthy');

  logger.info('[health.controller] getHealth → exit', { data });

  res.status(response.statusCode).json(response);
};
