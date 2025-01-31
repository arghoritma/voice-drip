import { NextResponse } from "next/server";
import db from "@/services/db";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  try {
    let session_id = cookieStore.get("session_id");
    if (!session_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await db("sessions")
      .select("user_id")
      .where("id", session_id.value)
      .first();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await db("categories")
      .where("user_id", session.user_id)
      .orderBy("name", "asc")
      .select("*");

    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
