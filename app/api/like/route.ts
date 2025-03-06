
import { NextResponse } from "next/server";
import db from "@/services/db";
import { verifySession } from "@/lib/dal";

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    
    if (!session.isAuth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { requestId } = await request.json();

    if (!requestId) {
      return NextResponse.json(
        { message: "Request ID is required" },
        { status: 400 }
      );
    }

    // Check if vote already exists
    const existingVote = await db("votes")
      .where({
        user_id: session.userId,
        request_id: requestId
      })
      .first();

    if (existingVote) {
      return NextResponse.json(
        { message: "Vote already exists" },
        { status: 400 }
      );
    }

    // Insert new vote
    await db("votes").insert({
      id: crypto.randomUUID(),
      user_id: session.userId,
      request_id: requestId,
      created_at: new Date()
    });

    // Log activity
    await db("activity_log").insert({
      id: crypto.randomUUID(),
      user_id: session.userId,
      object_type: "request",
      object_id: requestId,
      activity_type: "voted",
      description: "User voted on a request",
      created_at: new Date()
    });

    return NextResponse.json(
      { message: "Vote added successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding vote:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
