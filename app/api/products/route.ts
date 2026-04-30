import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category"); // /api/products?category=chicken

  try {
    let products;

    if (category) {
      // Specific category ke products
      const [rows]: any = await db.query(
        "SELECT * FROM products WHERE category = ? AND is_active = 1 ORDER BY created_at DESC",
        [category]
      );
      products = rows;
    } else {
      // Sabhi products
      const [rows]: any = await db.query(
        "SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC"
      );
      products = rows;
    }

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}