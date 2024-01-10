import { BaseError, ErrorCodes, ensureError } from "@zero/types/error-types";
import { MiddlewareFactory } from "@zero/types/middleware-types";
import { NextFetchEvent, NextRequest } from "next/server";

export const withErrorHandler: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    try {
      await next(request, _next);
    } catch (err) {
      const error = ensureError(err);
      throw new BaseError(ErrorCodes.MISC_MIDDLEWARE_FAILURE, {
        error,
      });
    }
  };
};
