"use server";

import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";
import {
  Request,
  RequestDetailsProps,
  RequestResponse,
  RequestWithDetails,
} from "@/types";
import { uploadRequestImages } from "@/lib/uploadFile";

export async function createRequest(
  prev: RequestResponse,
  formData: FormData
): Promise<RequestResponse> {
  const session = await verifySession();
  if (!session.isAuth) {
    return {
      success: false,
      errors: {
        _form: ["You must be logged in to create a request"],
      },
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as "feature" | "bug" | "improvement";
  const platformId = formData.get("platform") as string;
  const files = formData.getAll("files") as File[];
  const requestId = generateUUID();

  if (files && files.length > 0) {
    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const uploadedUrl = await uploadRequestImages(file, requestId);
          return uploadedUrl;
        } catch (error) {
          throw error;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log("Uploaded URLs:", uploadedUrls);
    } catch (error) {
      console.error("Error uploading files:", error);
      return {
        success: false,
        errors: {
          _form: ["Failed to upload images. Please try again."],
        },
      };
    }
  }
  if (!title || !description || !type || !platformId) {
    return {
      success: false,
      errors: {
        _form: ["Please fill in all required fields"],
      },
    };
  }
  try {
    await db.transaction(async (trx) => {
      // Insert the request
      await trx("requests").insert({
        id: requestId,
        title,
        description,
        type,
        platform_id: platformId,
        status: "submitted",
        created_at: new Date(),
        updated_at: new Date(),
        user_id: session.userId,
      });

      // Log the activity
      await trx("activity_log").insert({
        id: generateUUID(),
        user_id: session.userId,
        object_type: "request",
        object_id: requestId,
        activity_type: "created",
        description: `Created new ${type} request: ${title}`,
        created_at: new Date(),
      });
    });

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error("Error creating request:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to create request. Please try again."],
      },
    };
  }
}

export async function getRequests(): Promise<{
  success: boolean;
  data?: RequestDetailsProps[];
  errors?: { _form?: string[] };
}> {
  const session = await verifySession();
  try {
    // Base query without conditional raw statement
    let requestsQuery = db("requests")
      .join("users", "requests.user_id", "users.id")
      .join("platforms", "requests.platform_id", "platforms.id")
      .select(
        "requests.id",
        "requests.title",
        "requests.description",
        "requests.type",
        "requests.status",
        "requests.created_at",
        "users.name as user_name",
        "users.avatar as user_avatar",
        "platforms.logo as platform_logo",
        "platforms.name as platform_name",
        db.raw(
          "(SELECT COUNT(*) FROM request_tags WHERE request_tags.request_id = requests.id) as tags_count"
        ),
        db.raw(
          "(SELECT COUNT(*) FROM votes WHERE votes.request_id = requests.id) as likes"
        ),
        db.raw(
          "(SELECT COUNT(*) FROM comments WHERE comments.request_id = requests.id) as comments_count"
        )
      );
    // Add is_voted calculation based on userId presence
    if (session.userId) {
      requestsQuery = requestsQuery.select(
        db.raw(
          "(SELECT COUNT(*) > 0 FROM votes WHERE votes.request_id = requests.id AND votes.user_id = ?) as is_voted",
          [session.userId]
        )
      );
    } else {
      requestsQuery = requestsQuery.select(db.raw("false as is_voted"));
    }

    const requests = await requestsQuery.orderBy("requests.created_at", "desc");

    const formattedRequests = requests.map((request) => ({
      id: request.id,
      user: {
        name: request.user_name,
        avatar: request.user_avatar,
      },
      created_at: request.created_at,
      type: request.type,
      title: request.title,
      description: request.description,
      status: request.status,
      tags: [],
      likes: request.likes,
      comments: request.comments_count,
      isVoted: request.is_voted,
      platform_name: request.platform_name,
      platform_logo: request.platform_logo,
    }));

    return {
      success: true,
      data: formattedRequests,
    };
  } catch (error) {
    console.error("Error fetching requests:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch requests. Please try again."],
      },
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
          _form: ["Request not found."],
        },
      };
    }

    // Mengembalikan data request
    return {
      success: true,
      data: request,
    };
  } catch (error) {
    console.error("Error fetching request by ID:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch request. Please try again."],
      },
    };
  }
}

export async function getRequestWithDetails(requestId: string): Promise<{
  success: boolean;
  data?: RequestWithDetails;
  errors?: { _form?: string[] };
}> {
  try {
    // Mengambil data request dan user terkait berdasarkan ID
    const request = await db("requests")
      .join("users", "requests.user_id", "users.id")
      .select(
        "requests.*",
        "users.name as user_name",
        "users.avatar as user_avatar"
      )
      .where("requests.id", requestId)
      .first();

    // Jika request tidak ditemukan
    if (!request) {
      return {
        success: false,
        errors: {
          _form: ["Request not found."],
        },
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
      user: {
        name: request.user_name,
        avatar: request.user_avatar,
      },
      comments,
      vote_count: voteCount,
    };

    // Mengembalikan data request beserta komentar dan jumlah votes
    return {
      success: true,
      data: requestWithDetails,
    };
  } catch (error) {
    console.error("Error fetching request with details:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to fetch request details. Please try again."],
      },
    };
  }
}
