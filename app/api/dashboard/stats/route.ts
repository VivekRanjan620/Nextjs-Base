import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  // Get token from cookie
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  // Verify token and get userId
  const payload = await verifyToken(token);
  const userId = payload.userId;

  // Get user info from DB
  const [users]: any = await db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [userId]
  );

  return NextResponse.json({
    success: true,
    user: users[0],
  });
}