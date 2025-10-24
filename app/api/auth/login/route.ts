import { createToken } from "@/app/lib/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Environment variables for security
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// For demo purposes, we'll use a simple password check
// In production, store hashed passwords in a database
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

    if (!isValidUsername || !isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      username,
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
    });

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      user: {
        username,
        role: "admin",
      },
    });

    // Set secure cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
