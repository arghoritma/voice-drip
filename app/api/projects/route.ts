import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const projects = await db.select("*").from("projects");
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { team_id, name, description, deadline } = body;

    const [project] = await db("projects")
      .insert({
        team_id,
        name,
        description,
        deadline,
      })
      .returning("*");

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, team_id, name, description, deadline } = body;

    const [updatedProject] = await db("projects")
      .where({ id })
      .update({
        team_id,
        name,
        description,
        deadline,
      })
      .returning("*");

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedProject] = await db("projects")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(deletedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
