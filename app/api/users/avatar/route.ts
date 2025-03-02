import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import db from "@/services/db";
import { verifySession } from "@/lib/dal";

const avatar_path = "avatars";
const uploadDir = `${process.env.STORAGE_ROOT}/${avatar_path}`;
const storage_server = process.env.STORAGE_URL;

export async function POST(req: Request) {
  try {
    const session = await verifySession();

    if (!session.isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.userId;

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No avatar uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${user_id}-${Date.now()}-${file.name.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;
    const filePath = path.join(uploadDir, fileName);

    try {
      await writeFile(filePath, buffer);
    } catch (err) {
      console.error("Error writing avatar:", err);
      return NextResponse.json(
        { message: "Failed to save avatar", error: (err as Error).message },
        { status: 500 }
      );
    }

    const fileUrl = `${storage_server}/${avatar_path}/${fileName}`;

    await db("users").update({ avatar: fileUrl }).where({ id: user_id });

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      fileName: fileName,
      path: `${uploadDir}/${fileName}`,
      url: fileUrl,
    });
  } catch (err) {
    console.error("Avatar upload error:", err);
    return NextResponse.json(
      { message: "Avatar upload failed", error: (err as Error).message },
      { status: 500 }
    );
  }
}
