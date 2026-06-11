import { HttpStatus, HttpStatusCode } from '../constants/httpStatus';

export class ApiSuccessResponse<T = unknown> {
  public readonly success: true = true;
  public readonly statusCode: HttpStatusCode;
  public readonly message: string;
  public readonly data: T;

  constructor(data: T, message = 'Success', statusCode: HttpStatusCode = HttpStatus.OK) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
