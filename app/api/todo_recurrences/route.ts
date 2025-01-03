import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const todoRecurrences = await db.select("*").from("todo_recurrences");
    return NextResponse.json(todoRecurrences, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todo recurrences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      main_todo_id,
      pattern,
      next_date,
      original_date,
      is_active,
      user_id,
    } = body;

    const [todoRecurrence] = await db("todo_recurrences")
      .insert({
        main_todo_id,
        pattern,
        next_date,
        original_date,
        is_active,
        user_id,
      })
      .returning("*");

    return NextResponse.json(todoRecurrence, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo recurrence" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      main_todo_id,
      pattern,
      next_date,
      original_date,
      is_active,
      user_id,
      last_completed_date,
    } = body;

    const [updatedTodoRecurrence] = await db("todo_recurrences")
      .where({ id })
      .update({
        main_todo_id,
        pattern,
        next_date,
        original_date,
        is_active,
        user_id,
        last_completed_date,
      })
      .returning("*");

    if (!updatedTodoRecurrence) {
      return NextResponse.json(
        { error: "Todo recurrence not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTodoRecurrence, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo recurrence" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedTodoRecurrence] = await db("todo_recurrences")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedTodoRecurrence) {
      return NextResponse.json(
        { error: "Todo recurrence not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTodoRecurrence, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo recurrence" },
      { status: 500 }
    );
  }
}
