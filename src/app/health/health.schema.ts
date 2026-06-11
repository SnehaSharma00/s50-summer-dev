// Health module has no DB persistence, so no schema is needed.
// This file is a placeholder to satisfy the module structure contract.
// If persistence is added (e.g., storing health-check history), define the schema here.

export type HealthDocument = {
  checkedAt: Date;
  status: 'ok' | 'degraded';
};
