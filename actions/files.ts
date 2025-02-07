"use server";

import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import db from "@/services/db";

const uploadDir = process.env.UPLOAD_DIR || "public/uploads";
const avatarDir = process.env.AVATAR_DIR || "public/avatars";

// Ensure upload directories exist
[uploadDir, avatarDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return {
        errors: {
          _form: ["No file provided"],
        },
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    // Save file info to database
    await db("files").insert({
      id: uuidv4(),
      file_name: filename,
      file_url: `/uploads/${filename}`,
      uploaded_by: userId,
    });

    return {
      success: true,
      filename,
      path: `/uploads/${filename}`,
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Upload failed"],
      },
    };
  }
}

export async function uploadAvatar(formData: FormData) {
  try {
    const file = formData.get("avatar") as File;

    if (!file) {
      return {
        errors: {
          _form: ["No avatar provided"],
        },
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    const filepath = path.join(avatarDir, filename);

    fs.writeFileSync(filepath, buffer);

    return {
      success: true,
      filename,
      path: `/avatars/${filename}`,
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Avatar upload failed"],
      },
    };
  }
}

export async function getFiles() {
  try {
    const files = await db("files").select(
      "id",
      "file_name",
      "file_url",
      "uploaded_by",
      "uploaded_at"
    );

    return files;
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to get files"],
      },
    };
  }
}

export async function deleteFile(formData: FormData) {
  try {
    const filename = formData.get("filename") as string;
    const filepath = path.join(uploadDir, filename);

    if (!fs.existsSync(filepath)) {
      return {
        errors: {
          _form: ["File not found"],
        },
      };
    }

    // Delete file from filesystem
    fs.unlinkSync(filepath);

    // Delete file record from database
    await db("files").where("file_name", filename).del();

    return {
      success: true,
      message: "File deleted successfully",
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to delete file"],
      },
    };
  }
}
