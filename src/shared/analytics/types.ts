// Error event type
export type ErrorEvent = {
  errorCode: string;
  errorMessage: string;
  context?: Record<string, unknown>;
};
