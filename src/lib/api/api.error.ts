export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public detail?: Record<string, unknown>,
  ) {
    super(message);
  }
}
