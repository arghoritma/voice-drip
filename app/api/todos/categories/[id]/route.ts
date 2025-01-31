import { NextResponse } from "next/server";
import db from "@/services/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, color } = await req.json();

    const category = await db("categories")
      .where("id", params.id)
      .update({
        name,
        color,
        updated_at: new Date(),
      })
      .returning("*");

    return NextResponse.json(category[0]);
  } catch (error) {
    console.log("[CATEGORY_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db("categories")
      .where("id", params.id)
      .del()
      .returning("*");

    return NextResponse.json(category[0]);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
