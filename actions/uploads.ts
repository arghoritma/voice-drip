"use server";

import { writeFile } from "fs/promises";
import path from "path";
import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";
import { FormState } from "@/lib/definitions";

interface prevProp {
  error: boolean;
  data: string;
  success: boolean;
}

const storageUrl = process.env.STORAGE_URL!;
const storageRoot = process.env.STORAGE_ROOT!;

export async function uploadAvatar(
  prev: prevProp,
  formData: FormData
): Promise<prevProp> {
  try {
    const session = await verifySession();

    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { success: false, error: true, data: "No file uploaded" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `avatar_${session.userId}_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/avatars`);
    const filePath = path.join(uploadDir, formattedFileName);
    console.log("Upload path:", filePath);

    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    await db("users")
      .where({ id: session.userId })
      .update({
        avatar: `${storageUrl}/avatars/${formattedFileName}`,
        updated_at: new Date(),
      });

    return {
      success: true,
      data: `File ${formattedFileName} uploaded successfully`,
      error: false,
    };
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      success: false,
      data: `Error uploading file: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error: true,
    };
  }
}

export async function uploadFile(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await verifySession();

    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { errors: { _form: ["No file uploaded"] } };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `file_${session.userId}_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/files`);
    const filePath = path.join(uploadDir, formattedFileName);
    console.log("Upload path:", filePath);

    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    await db("files").insert({
      id: generateUUID(),
      uploaded_by: session.userId as string,
      file_name: formattedFileName,
      file_url: `${storageUrl}/files/${formattedFileName}`,
      uploaded_at: new Date(),
    });

    return {
      success: true,
      message: `File ${formattedFileName} uploaded successfully`,
    };
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      errors: {
        _form: [
          `Error uploading file: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
      },
    };
  }
}

export async function uploadPostImage(
  postId: string,
  formData: FormData
): Promise<FormState> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { errors: { _form: ["No file uploaded"] } };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `post_${postId}_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/posts`);
    const filePath = path.join(uploadDir, formattedFileName);

    await writeFile(filePath, buffer);

    await db("post_images").insert({
      id: generateUUID(),
      post_id: postId,
      image_url: `${storageUrl}/posts/${formattedFileName}`,
      created_at: new Date(),
    });

    return {
      success: true,
      message: `Post image uploaded successfully`,
    };
  } catch (error: unknown) {
    return {
      errors: {
        _form: [
          `Error uploading post image: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
      },
    };
  }
}

export async function uploadCommentImage(
  commentId: string,
  formData: FormData
): Promise<FormState> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { errors: { _form: ["No file uploaded"] } };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `comment_${commentId}_${timestamp}${fileExtension}`;

    const uploadDir = path.join(process.cwd(), `${storageRoot}/comments`);
    const filePath = path.join(uploadDir, formattedFileName);

    await writeFile(filePath, buffer);

    await db("comment_images").insert({
      id: generateUUID(),
      comment_id: commentId,
      image_url: `${storageUrl}/comments/${formattedFileName}`,
      created_at: new Date(),
    });

    return {
      success: true,
      message: `Comment image uploaded successfully`,
    };
  } catch (error: unknown) {
    return {
      errors: {
        _form: [
          `Error uploading comment image: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
      },
    };
  }
}
