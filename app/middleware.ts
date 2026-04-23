import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ─── User protected routes ───
  // Logged in hona chahiye — any role allowed
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      await verifyToken(token);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ─── Admin protected routes ───
  // Logged in hona chahiye AND role === "admin"
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      const payload = await verifyToken(token);

      // Role check — agar admin nahi hai toh dashboard pe bhejo
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};