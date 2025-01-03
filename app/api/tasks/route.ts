import { NextResponse } from "next/server";
import db from "@/config/db";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  try {
    const tasks = await db("tasks")
      .select(
        "tasks.*",
        "users.username as assigned_to_name",
        "projects.name as project_name"
      )
      .leftJoin("users", "tasks.assigned_to", "users.id")
      .leftJoin("projects", "tasks.project_id", "projects.id")
      .orderBy("tasks.created_at", "desc");

    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      project_id,
      title,
      description,
      assigned_to,
      status,
      priority,
      due_date,
    } = body;

    const task = await db("tasks")
      .insert({
        id: uuidv4(),
        project_id,
        title,
        description,
        assigned_to,
        status: status || "To-Do",
        priority,
        due_date,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning("*");

    return NextResponse.json({ data: task[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      project_id,
      title,
      description,
      assigned_to,
      status,
      priority,
      due_date,
    } = body;

    const task = await db("tasks")
      .where({ id })
      .update({
        project_id,
        title,
        description,
        assigned_to,
        status,
        priority,
        due_date,
        updated_at: new Date(),
      })
      .returning("*");

    if (!task.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ data: task[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deleted = await db("tasks").where({ id }).del().returning("*");

    if (!deleted.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ data: deleted[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
