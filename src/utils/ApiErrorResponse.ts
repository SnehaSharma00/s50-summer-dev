import { HttpStatus, HttpStatusCode } from '../constants/httpStatus';

export class ApiErrorResponse {
  public readonly success: false = false;
  public readonly statusCode: HttpStatusCode;
  public readonly message: string;
  public readonly errors: unknown[];

  constructor(
    message = 'An error occurred',
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors: unknown[] = [],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
