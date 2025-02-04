"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { generateUUID } from "@/lib/helper";
import db from "@/services/db";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup(
  prev: FormState,
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
    console.log("name", name);

    // Check if email already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      console.log("Email already exists");
      return {
        errors: {
          email: ["Email already exists"],
        },
      };
    }

    // Generate unique ID for the user
    const userId = generateUUID();

    // Use transaction for atomic operation
    await db.transaction(async (trx) => {
      await trx("users").insert({
        id: userId,
        email: email,
        username: name,
        password: await bcrypt.hash(password, 10),
        created_at: new Date(),
        updated_at: new Date(),
        role: "user",
      });
    });

    await createSession(userId);
    redirect("/dashboard");
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
        _form: ["Failed to create account. Please try again."],
      },
    };
  }
}

export async function signin(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Get form fields
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form fields
  if (!email || !password) {
    return {
      errors: {
        _form: ["Please provide both email and password"],
      },
    };
  }

  try {
    // Find user by email
    const user = await db("users").where({ email }).first();

    // If user not found
    if (!user) {
      return {
        errors: {
          _form: ["User not found"],
        },
      };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!passwordMatch) {
      return {
        errors: {
          _form: ["Invalid credentials"],
        },
      };
    }

    await createSession(user.id);
    redirect("/dashboard");
  } catch (error) {
    return {
      errors: {
        _form: ["An error occurred during sign in. Please try again."],
      },
    };
  }
}

export async function logout() {
  deleteSession();
  redirect("/auth/login");
}
