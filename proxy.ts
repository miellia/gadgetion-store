import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route (excluding the login page itself)
  const isAdminRoute = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isLoginPage = pathname === "/admin/login";

  // Check for session cookie
  const sessionCookie = request.cookies.get("admin_session");
  const isAuthenticated = sessionCookie?.value === "true";

  // If trying to access admin without auth, redirect to login
  if (isAdminRoute && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access login while already authenticated, redirect to admin
  if (isLoginPage && isAuthenticated) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
