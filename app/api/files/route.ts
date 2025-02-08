import { NextResponse } from "next/server";
import db from "@/services/db";

export async function GET() {
  try {
    const files = await db.select("*").from("files");
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, path, size, type, uploaded_by } = body;

    const [file] = await db("files")
      .insert({
        name,
        path,
        size,
        type,
        uploaded_by,
      })
      .returning("*");

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create file" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, path, size, type, uploaded_by } = body;

    const [updatedFile] = await db("files")
      .where({ id })
      .update({
        name,
        path,
        size,
        type,
        uploaded_by,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedFile] = await db("files")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(deletedFile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
