import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const divisions = await db.select("*").from("divisions");
    return NextResponse.json(divisions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch divisions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    const [division] = await db("divisions")
      .insert({
        name,
        description,
      })
      .returning("*");

    return NextResponse.json(division, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create division" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description } = body;

    const [updatedDivision] = await db("divisions")
      .where({ id })
      .update({
        name,
        description,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedDivision) {
      return NextResponse.json(
        { error: "Division not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDivision, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update division" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedDivision] = await db("divisions")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedDivision) {
      return NextResponse.json(
        { error: "Division not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedDivision, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete division" },
      { status: 500 }
    );
  }
}
