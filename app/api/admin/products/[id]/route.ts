import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { verifyToken } from "@/app/lib/auth";

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

// PUT — product update karo
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();
  const {
    name, category, sub, weight,
    original_price, sale_price, starts_from,
    tag, discount, customisable, image_url, is_active
  } = body;

  await db.query(
    `UPDATE products SET
     name=?, category=?, sub=?, weight=?,
     original_price=?, sale_price=?, starts_from=?,
     tag=?, discount=?, customisable=?, image_url=?, is_active=?
     WHERE id=?`,
    [name, category, sub, weight, original_price, sale_price,
     starts_from, tag, discount, customisable ? 1 : 0, image_url, is_active ? 1 : 0, params.id]
  );

  return NextResponse.json({ success: true, message: "Product updated!" });
}

// DELETE — product delete karo
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  await db.query("DELETE FROM products WHERE id = ?", [params.id]);

  return NextResponse.json({ success: true, message: "Product deleted!" });
}