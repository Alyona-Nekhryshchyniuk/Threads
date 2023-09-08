import { authMiddleware } from "@clerk/nextjs";

// By default, all routes, even '/',  are hidden behind authentication by this authMiddleware()
// publicRoutes[] will make some routes accesible even before authentication
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk"],
  ignoredRoutes: "/api/webhook/clerk",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
