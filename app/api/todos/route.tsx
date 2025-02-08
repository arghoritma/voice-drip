import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";
import db from "@/services/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const { userId } = await verifySession();

  const todos = await db("todos")
    .select("*")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");

  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const { userId } = await verifySession();
  const { title, description, date } = await request.json();

  const todo = {
    id: uuidv4(),
    title,
    description,
    date,
    status: "pending",
    created_at: new Date(),
    user_id: userId,
  };

  await db("todos").insert(todo);

  return NextResponse.json(todo);
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { userId } = await verifySession();

  await db("todos").where({ id }).update({
    status: "completed",
    completed_at: new Date(),
  });

  return NextResponse.json({ message: "Todo marked as complete" });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json({ message: "Todo deleted successfully" });
}
