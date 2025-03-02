"use server";

import { verifySession } from "@/lib/dal";
import { FormState, ProfileResponse } from "@/lib/definitions";
import db from "@/services/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Get form fields
  const name = formData.get("name") as string;
  const phone_number = formData.get("phone_number") as string;

  // Validate phone number contains only digits
  if (!/^\d+$/.test(phone_number)) {
    return {
      errors: {
        phone_number: ["Phone number must contain only numbers."],
      },
    };
  }

  const session = await verifySession();

  try {
    // Prepare update data
    const updateData = {
      name: name,
      phone: phone_number,
      updated_at: new Date(),
    };

    // Use transaction for atomic operation
    await db.transaction(async (trx) => {
      await trx("users").where({ id: session.userId }).update(updateData);
    });

    revalidatePath("/dashboard/profile");
    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to update profile. Please try again."],
      },
    };
  }
}
export async function getProfile(): Promise<any> {
  const session = await verifySession();

  try {
    const user = await db("users")
      .where({ id: session.userId })
      .select("name", "email", "phone", "avatar")
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return { ...user };
  } catch (error) {
    return {
      error: error,
    };
  }
}
