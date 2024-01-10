import { MiddlewareFactory } from "@zero/types/middleware-types";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    if (res) {
      res.headers.set("x-content-type-options", "nosniff");
      res.headers.set("x-dns-prefetch-control", "false");
      res.headers.set("x-download-options", "noopen");
      res.headers.set("x-frame-options", "SAMEORIGIN");
    }

    return res;
  };
};
