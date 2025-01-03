import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const verifiedToken = token && verifyAuth(token);

  const path = request.nextUrl.pathname;

  // Public routes yang tidak perlu autentikasi
  const isPublicRoute = path.startsWith("/auth/");

  // Jika mengakses halaman login/register tapi sudah terautentikasi, redirect ke dashboard
  if (isPublicRoute && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika mengakses protected route tapi belum terautentikasi, redirect ke login
  if (!isPublicRoute && !verifiedToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/dashboard/:path*",
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
