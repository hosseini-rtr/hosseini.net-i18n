import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/admin"];
const authRoutes = ["/login"];

// JWT verification function
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production"
);

async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

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

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.includes(route)
    );

    // Check if the current path is an auth route
    const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

    // Get the auth token from cookies
    const token = request.cookies.get("auth-token")?.value;

    // If accessing a protected route
    if (isProtectedRoute) {
      if (!token) {
        // No token, redirect to login
        const loginUrl = new URL("/en/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      try {
        // Verify the token
        const payload = await verifyToken(token);
        if (!payload) {
          // Invalid token, redirect to login
          const loginUrl = new URL("/en/login", request.url);
          const response = NextResponse.redirect(loginUrl);
          response.cookies.delete("auth-token");
          return response;
        }

        // Token is valid, allow access
        return NextResponse.next();
      } catch (error) {
        // Token verification failed, redirect to login
        const loginUrl = new URL("/en/login", request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("auth-token");
        return response;
      }
    }

    // If accessing login page while authenticated
    if (isAuthRoute && token) {
      try {
        const payload = await verifyToken(token);
        if (payload) {
          // User is authenticated, redirect to admin dashboard
          const adminUrl = new URL("/en/admin", request.url);
          return NextResponse.redirect(adminUrl);
        }
      } catch (error) {
        // Token is invalid, allow access to login page
        const response = NextResponse.next();
        response.cookies.delete("auth-token");
        return response;
      }
    }

    // Allow access to public routes
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Match all admin routes
    "/(.*)/admin/:path*",
    // Match API routes that need protection
    "/api/posts/:path*",
    // Match auth routes
    "/(.*)/login",
    // Exclude static files and API auth routes
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
