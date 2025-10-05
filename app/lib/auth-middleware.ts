import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../api/auth/login/route";

// Middleware to check authentication
export async function requireAuth(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Add user info to request headers for use in the actual handler
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.username);
    requestHeaders.set("x-user-role", payload.role);

    return null; // No error, authentication successful
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Helper to get authenticated user from request
export function getAuthenticatedUser(request: NextRequest) {
  return {
    username: request.headers.get("x-user-id"),
    role: request.headers.get("x-user-role"),
  };
}
