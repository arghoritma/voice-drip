import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import db from "@/services/db";

export async function GET() {
  try {
    const session = await verifySession();

    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db("users")
      .select([
        "id",
        "email",
        "username",
        "phone_number",
        "role",
        "avatar",
        "created_at",
        "updated_at",
      ])
      .where({ id: session.userId })
      .first();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
