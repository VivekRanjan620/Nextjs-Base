import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

// Helper — admin check
async function isAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return false;
  try {
    const payload = await verifyToken(token);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// GET — sabhi products laao
export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  const [products]: any = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC"
  );

  return NextResponse.json({ success: true, products });
}

// POST — naya product add karo
export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const {
    name, category, sub, weight,
    original_price, sale_price, starts_from,
    tag, discount, customisable, image_url
  } = body;

  if (!name || !category) {
    return NextResponse.json({ success: false, message: "Name and category required" }, { status: 400 });
  }

  // Empty string ko NULL mein convert karo — DECIMAL columns ke liye
  const toNum = (val: any) => (val === "" || val === null || val === undefined) ? null : Number(val);

  await db.query(
    `INSERT INTO products 
     (name, category, sub, weight, original_price, sale_price, starts_from, tag, discount, customisable, image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      category,
      sub || null,
      weight || null,
      toNum(original_price),
      toNum(sale_price),
      toNum(starts_from),
      tag || null,
      toNum(discount),
      customisable ? 1 : 0,
      image_url || null
    ]
  );

  return NextResponse.json({ success: true, message: "Product added!" });
}