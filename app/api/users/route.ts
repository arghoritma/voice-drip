import { NextResponse } from "next/server";
import db from "@/services/db";

export async function GET() {
  try {
    const users = await db.select("*").from("users");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, phone_number, password, role } = body;

    const [user] = await db("users")
      .insert({
        email,
        username,
        phone_number,
        password,
        role,
      })
      .returning("*");

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, username, phone_number, password, role } = body;

    const [updatedUser] = await db("users")
      .where({ id })
      .update({
        email,
        username,
        phone_number,
        password,
        role,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedUser] = await db("users")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
