export type SuccessActionResult<G = unknown> = {
  success: true;
  data?: G;
};
export type ErrorActionResult = {
  success: false;
  code?: string;
  message?: string;
  details?: Record<string, unknown>;
};

export type ActionResult = SuccessActionResult | ErrorActionResult;
