// DTO for GET /health response shape
export interface GetHealthDto {
  status: 'ok';
  uptime: number;
  timestamp: string;
}
