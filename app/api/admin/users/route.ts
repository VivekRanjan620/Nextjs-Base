import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Verify token
  const payload = await verifyToken(token);

  // Only admin can access this
  if (payload.role !== "admin") {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  // Get all users from DB
  const [users]: any = await db.query(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );

  return NextResponse.json({
    success: true,
    users,
    totalUsers: users.length,
  });
}