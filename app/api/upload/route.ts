import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const uploadDir = "/storage/uploads";

export async function POST(req: Request) {
  try {
    const publicUploadDir = path.join(process.cwd(), "public", uploadDir);
    
    try {
      await mkdir(publicUploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
      return NextResponse.json(
        { message: "Failed to create upload directory", error: (err as Error).message },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(publicUploadDir, fileName);
    

    try {
      await writeFile(filePath, buffer);
    } catch (err) {
      console.error("Error writing file:", err);
      return NextResponse.json(
        { message: "Failed to save file", error: (err as Error).message },
        { status: 500 }
      );
    }


    const fileUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}${uploadDir}/${fileName}`;

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: fileName,
      path: `${uploadDir}/${fileName}`,
      url: fileUrl
    });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { message: "File upload failed", error: (err as Error).message },
      { status: 500 }
    );
  }
}