"use server";

import db from "@/services/db";
import { verifySession } from "@/lib/dal";
import { generateUUID } from "@/lib/helper";

export async function createRequest(
  prev: any,
  formData: FormData
): Promise<any> {
  const session = await verifySession();
  if (!session.isAuth) {
    return {
      errors: {
        _form: ["You must be logged in to create a request"],
      },
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as "feature" | "bug" | "improvement";

  if (!title || !description || !type) {
    return {
      errors: {
        _form: ["Please fill in all required fields"],
      },
    };
  }

  try {
    const requestId = generateUUID();

    await db.transaction(async (trx) => {
      // Insert the request
      await trx("requests").insert({
        id: requestId,
        title,
        description,
        type,
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
      errors: {
        _form: ["Failed to create request. Please try again."],
      },
    };
  }
}
