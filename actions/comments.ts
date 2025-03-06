import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";

export async function addCommentToRequest(
  prev: any,
  formData: FormData
): Promise<any> {
  const session = await verifySession();
  if (!session.isAuth) {
    return {
      success: false,
      errors: {
        _form: ["You must be logged in to comment."],
      },
    };
  }

  try {
    const content = formData.get("content") as string;
    const requestId = formData.get("requestId") as string;

    // Validasi konten komentar
    if (!content || content.trim().length === 0) {
      return {
        success: false,
        errors: {
          _form: ["Comment content cannot be empty."],
        },
      };
    }

    // Tambahkan komentar baru
    await db("comments").insert({
      id: generateUUID(), // Fungsi untuk menghasilkan UUID
      request_id: requestId,
      user_id: session.userId,
      content: content.trim(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to add comment. Please try again."],
      },
    };
  }
}
