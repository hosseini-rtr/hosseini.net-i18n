import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes, static files, and other system routes
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/favicon") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Allow access to all routes
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Exclude static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
