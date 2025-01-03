import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const teamMembers = await db.select("*").from("team_members");
    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, team_id } = body;

    const [teamMember] = await db("team_members")
      .insert({
        user_id,
        team_id,
      })
      .returning("*");

    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, user_id, team_id } = body;

    const [updatedTeamMember] = await db("team_members")
      .where({ id })
      .update({
        user_id,
        team_id,
      })
      .returning("*");

    if (!updatedTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTeamMember, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedTeamMember] = await db("team_members")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedTeamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedTeamMember, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
