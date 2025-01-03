import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const comments = await db.select("*").from("comments");
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { task_id, user_id, content } = body;

    const [comment] = await db("comments")
      .insert({
        task_id,
        user_id,
        content,
      })
      .returning("*");

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, content } = body;

    const [updatedComment] = await db("comments")
      .where({ id })
      .update({
        content,
      })
      .returning("*");

    if (!updatedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedComment] = await db("comments")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(deletedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
