import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const userDivisions = await db.select("*").from("user_divisions");
    return NextResponse.json(userDivisions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user divisions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, division_id } = body;

    const [userDivision] = await db("user_divisions")
      .insert({
        user_id,
        division_id,
      })
      .returning("*");

    return NextResponse.json(userDivision, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user division" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, user_id, division_id } = body;

    const [updatedUserDivision] = await db("user_divisions")
      .where({ id })
      .update({
        user_id,
        division_id,
      })
      .returning("*");

    if (!updatedUserDivision) {
      return NextResponse.json(
        { error: "User division not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUserDivision, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user division" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedUserDivision] = await db("user_divisions")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedUserDivision) {
      return NextResponse.json(
        { error: "User division not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedUserDivision, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user division" },
      { status: 500 }
    );
  }
}
