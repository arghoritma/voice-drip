"use server";

import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";
import { Request, CommentWithUser, RequestWithDetails } from "@/type";

export async function createRequest(
  prev: any,
  formData: FormData
): Promise<any> {
  const session = await verifySession();
  if (!session.isAuth) {
    return {
      errors: {
        _form: ["You must be logged in to create a request"]
      }
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as "feature" | "bug" | "improvement";

  if (!title || !description || !type) {
    return {
      errors: {
        _form: ["Please fill in all required fields"]
      }
    };
  }

  try {
    const requestId = generateUUID();

    await db.transaction(async trx => {
      // Insert the request
      await trx("requests").insert({
        id: requestId,
        title,
        description,
        type,
        status: "submitted",
        created_at: new Date(),
        updated_at: new Date(),
        user_id: session.userId
      });

      // Log the activity
      await trx("activity_log").insert({
        id: generateUUID(),
        user_id: session.userId,
        object_type: "request",
        object_id: requestId,
        activity_type: "created",
        description: `Created new ${type} request: ${title}`,
        created_at: new Date()
      });
    });

    return {
      success: true,
      errors: {}
    };
  } catch (error) {
    console.error("Error creating request:", error);
    return {
      errors: {
        _form: ["Failed to create request. Please try again."]
      }
    };
  }
}

export async function getRequests(): Promise<{
  success: boolean;
  data?: Request[];
  errors?: { _form?: string[] };
}> {
  try {
    // Mengambil data requests dari database
    const requests = await db("requests")
      .select("*")
      .orderBy("created_at", "desc");

    // Mengembalikan data requests
    return {
      success: true,
      data: requests
    };
  } catch (error) {
    console.error("Error fetching requests:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch requests. Please try again."]
      }
    };
  }
}

export async function getRequestById(requestId: string): Promise<{
  success: boolean;
  data?: Request;
  errors?: { _form?: string[] };
}> {
  try {
    // Mengambil data request berdasarkan ID
    const request = await db("requests").where("id", requestId).first();

    // Jika request tidak ditemukan
    if (!request) {
      return {
        success: false,
        errors: {
          _form: ["Request not found."]
        }
      };
    }

    // Mengembalikan data request
    return {
      success: true,
      data: request
    };
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch request. Please try again."]
      }
    };
  }
}

export async function getRequestWithDetails(requestId: string): Promise<{
  success: boolean;
  data?: RequestWithDetails;
  errors?: { _form?: string[] };
}> {
  try {
    // Mengambil data request berdasarkan ID
    const request = await db("requests").where("id", requestId).first();

    // Jika request tidak ditemukan
    if (!request) {
      return {
        success: false,
        errors: {
          _form: ["Request not found."]
        }
      };
    }

    // Mengambil komentar terkait request beserta informasi user
    const comments = await db("comments")
      .join("users", "comments.user_id", "users.id")
      .select(
        "comments.id",
        "comments.user_id",
        "comments.content",
        "comments.created_at",
        "comments.updated_at",
        "users.name as user_name", // Ambil nama user
        "users.avatar as user_avatar" // Ambil avatar user
      )
      .where("comments.request_id", requestId)
      .orderBy("comments.created_at", "asc");

    // Menghitung jumlah votes terkait request
    const voteCountResult = await db("votes")
      .where("request_id", requestId)
      .count("id as vote_count")
      .first();
    const voteCount = voteCountResult ? Number(voteCountResult.vote_count) : 0;

    // Menggabungkan data request, komentar, dan jumlah votes
    const requestWithDetails: RequestWithDetails = {
      ...request,
      comments,
      vote_count: voteCount
    };

    // Mengembalikan data request beserta komentar dan jumlah votes
    return {
      success: true,
      data: requestWithDetails
    };
  } catch (error) {
    console.error("Error fetching request with details:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch request details. Please try again."]
      }
    };
  }
}
