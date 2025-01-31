"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { generateUUID } from "@/lib/helper";
import db from "@/services/db";
import bcrypt from "bcrypt";

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { name, email, password } = validatedFields.data;

    // Check if email already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return {
        errors: {
          email: ["Email already exists"],
        },
      };
    }

    // Generate unique ID for the user
    const userId = generateUUID();

    // Insert new user into database
    await db("users").insert({
      id: userId,
      email: email,
      username: name,
      password: await bcrypt.hash(password, 10),
      created_at: new Date(),
      role: "user",
    });

    return { success: true };
    console.log("User created successfully");
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to create account. Please try again."],
      },
    };
    console.log("Failed to create account:", error);
  }
}
