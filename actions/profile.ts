"use server";

import { verifySession } from "@/lib/dal";
import { FormState } from "@/lib/definitions";
import db from "@/services/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function updateProfile(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Get form fields
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone_number = formData.get("phone_number") as string;

  const session = await verifySession();

  try {
    // Check if email already exists for other users
    const existingUser = await db("users")
      .where({ email })
      .whereNot({ id: session.userId })
      .first();

    if (existingUser) {
      return {
        errors: {
          email: ["Email already exists"],
        },
      };
    }

    // Prepare update data
    const updateData: any = {
      username: name,
      email: email,
      phone_number: phone_number,
      updated_at: new Date(),
    };

    // Only hash and update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Use transaction for atomic operation
    await db.transaction(async (trx) => {
      await trx("users").where({ id: session.userId }).update(updateData);
    });

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("unique constraint") ||
        error.message.includes("duplicate key")
      ) {
        return {
          errors: {
            email: ["This email is already registered"],
          },
        };
      }

      if (error.message.includes("password")) {
        return {
          errors: {
            password: ["Password processing failed"],
          },
        };
      }
    }

    return {
      errors: {
        _form: ["Failed to update profile. Please try again."],
      },
    };
  }
}
