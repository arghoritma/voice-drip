import { NextResponse } from "next/server";
import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";

export async function POST(request: Request) {
  try {
    const session = await verifySession();

    if (!session.isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const content = formData.get("content") as string;
    const requestId = formData.get("requestId") as string;

    if (!content || !requestId) {
      return NextResponse.json(
        { error: "Content and requestId are required" },
        { status: 400 }
      );
    }

    const comment = await db("comments").insert({
      id: generateUUID(),
      user_id: session.userId,
      request_id: requestId,
      content: content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Log the activity
    await db("activity_log").insert({
      id: generateUUID(),
      user_id: session.userId,
      object_type: "comment",
      object_id: comment[0],
      activity_type: "created",
      description: "Added a new comment",
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
