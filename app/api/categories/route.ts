import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const categories = await db.select("*").from("categories");
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, color, user_id } = body;

    const [category] = await db("categories")
      .insert({
        name,
        color,
        user_id,
      })
      .returning("*");

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, color } = body;

    const [updatedCategory] = await db("categories")
      .where({ id })
      .update({
        name,
        color,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedCategory] = await db("categories")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
