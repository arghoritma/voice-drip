import { NextResponse } from "next/server";
import db from "@/services/db";
import { cookies } from "next/headers";
import { generateUUID } from "@/lib/helper";

export async function POST(req: Request) {
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

    const body = await req.json();
    const { name, color } = body;

    if (!name || !color) {
      return NextResponse.json(
        { error: "Name and color are required" },
        { status: 400 }
      );
    }

    const newCategory = {
      id: generateUUID(),
      name,
      color,
      user_id: session.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db("categories").insert(newCategory);

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("[CATEGORIES_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
