import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const todos = await db.select("*").from("todos");
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, completed } = body;

    const [todo] = await db("todos")
      .insert({
        title,
        completed: completed || false,
      })
      .returning("*");

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, completed } = body;

    const [updatedTodo] = await db("todos")
      .where({ id })
      .update({
        title,
        completed,
      })
      .returning("*");

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedTodo] = await db("todos")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
