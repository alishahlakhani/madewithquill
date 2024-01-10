import { MiddlewareFactory } from "@zero/types/middleware-types";
import { NextFetchEvent, NextRequest } from "next/server";

export const withFeatures: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return next(request, _next);
  };
};
