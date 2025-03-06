import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";

export async function addVoteToRequest(requestId: string): Promise<{
  success: boolean;
  errors?: {
    _form: string[];
  };
}> {
  try {
    // Verifikasi session user
    const session = await verifySession();
    if (!session.isAuth) {
      return {
        success: false,
        errors: {
          _form: ["You must be logged in to vote."],
        },
      };
    }

    // Cek apakah user sudah memberikan vote sebelumnya
    const existingVote = await db("votes")
      .where({
        request_id: requestId,
        user_id: session.userId,
      })
      .first();

    if (existingVote) {
      return {
        success: false,
        errors: {
          _form: ["You have already voted for this request."],
        },
      };
    }

    // Tambahkan vote baru
    await db("votes").insert({
      id: generateUUID(),
      request_id: requestId,
      user_id: session.userId,
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding vote:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to add vote. Please try again."],
      },
    };
  }
}
