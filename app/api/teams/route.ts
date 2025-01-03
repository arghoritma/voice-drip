import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const teams = await db.select("*").from("teams");
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const [team] = await db("teams")
      .insert({
        name,
        description,
      })
      .returning("*");

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description } = body;

    const [updatedTeam] = await db("teams")
      .where({ id })
      .update({
        name,
        description,
      })
      .returning("*");

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedTeam] = await db("teams")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(deletedTeam, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}
