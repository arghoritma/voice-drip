import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth-middleware";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const headerSession = req.headers.get("X-User-Session");
  const cookieSession = req.cookies.get("session")?.value;
  const session = headerSession || cookieSession;
  const payload = await verifyAuth(session);

  if (isProtectedRoute && !payload) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isPublicRoute && payload) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
