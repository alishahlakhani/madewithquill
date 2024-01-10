import { stackMiddlewares } from "./middlewares/stack-middlewares";
import { withErrorHandler } from "./middlewares/with-error-handling";
import { withFeatures } from "./middlewares/with-features";
import { withLogging } from "./middlewares/with-logging";

export default stackMiddlewares([withLogging, withFeatures, withErrorHandler]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/*|auth|favicon.ico|robots.txt|images|$).*)",
  ],
};
