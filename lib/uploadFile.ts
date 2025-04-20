"use server";

import { promises as fs } from "fs";
import path from "path";
import db from "@/services/db";
import { generateUUID } from "./helper";

const storageUrl = process.env.STORAGE_URL!;
const storageRoot = process.env.STORAGE_ROOT!;

export async function uploadFile(file: File, folder: string): Promise<string> {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `file_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/${folder}`);
    const filePath = path.join(uploadDir, formattedFileName);

    const totalSize = buffer.length;
    let uploadedSize = 0;

    await fs.writeFile(filePath, buffer);
    uploadedSize = totalSize;
    const percentage = Math.round((uploadedSize / totalSize) * 100);
    console.log(`Upload progress: ${percentage}%`);

    return `${storageUrl}/${folder}/${formattedFileName}`;
  } catch (error: unknown) {
    throw new Error(
      `Error uploading file: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function uploadRequestImages(file: File, requestId: string) {
  console.log("Uploading file:", file.name);
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `file_${requestId}_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/requests`);
    const filePath = path.join(uploadDir, formattedFileName);

    const totalSize = buffer.length;
    let uploadedSize = 0;

    await fs.writeFile(filePath, buffer);
    uploadedSize = totalSize;
    const percentage = Math.round((uploadedSize / totalSize) * 100);
    console.log(`Upload progress: ${percentage}%`);

    const fileUrl = `${storageUrl}/requests/${formattedFileName}`;
    const id = generateUUID();

    // Save to database
    await db("request_images").insert({
      id: id,
      request_id: requestId,
      image_url: fileUrl,
    });
  } catch (error: unknown) {
    console.error("Error uploading file:", error);
  }
}
