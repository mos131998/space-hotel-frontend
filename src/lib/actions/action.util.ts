import { ErrorActionResult } from "@/lib/actions/action.type";
import { ApiError } from "../api/api.error";

export const formatActionError = (error: unknown): ErrorActionResult => {
  if (error instanceof ApiError) {
    return {
      success: false,
      code: error.code,
      message: error.message,
      details: error.detail,
    };
  }
  return {
    success: false,
    message: "internal server error",
    code: "INTERNAL_SERVER_ERROR",
  };
};
