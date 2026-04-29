import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ loggedIn: false });

  try {
    const payload = await verifyToken(token);
    const [users]: any = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [payload.userId]
    );
    if (users.length === 0) return NextResponse.json({ loggedIn: false });
    return NextResponse.json({ loggedIn: true, user: users[0] });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}