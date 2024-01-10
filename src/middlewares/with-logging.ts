import { MiddlewareFactory } from "@zero/types/middleware-types";
import { NextFetchEvent, NextRequest } from "next/server";

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    console.info(
      "🔮",
      request.nextUrl.pathname,
      request.nextUrl.searchParams.toString()
    );
    return next(request, _next);
  };
};
