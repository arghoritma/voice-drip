"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { generateUUID } from "@/lib/helper";
import db from "@/services/db";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";

export async function signup(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const avatarUrl = "https://ui-avatars.com/api/?name=";

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
    await db("users").insert({
      id: userId,
      email: email,
      name: name,
      avatar: `${avatarUrl}${name}`,
      password_has: await bcrypt.hash(password, 10),
      created_at: new Date(),
      updated_at: new Date(),
    });

    await createSession(userId);
    return { success: true };
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
    const passwordMatch = await bcrypt.compare(password, user.password_has);

    // If password doesn't match
    if (!passwordMatch) {
      return {
        errors: {
          _form: ["Invalid credentials"],
        },
      };
    }

    await createSession(user.id);
    return {
      success: true,
    };
  } catch (error) {
    return {
      errors: {
        _form: ["An error occurred during sign in. Please try again."],
      },
    };
  }
}

export async function googleSignin(payload: any) {
  const { email, name, uid, Avatar } = payload;
  try {
    const existingUser = await db("users").where({ email }).first();

    if (!existingUser) {
      await db("users").insert({
        id: uid,
        email,
        name: name,
        password_has: uid,
        created_at: new Date(),
        updated_at: new Date(),
        avatar: Avatar,
      });
    }
    await createSession(uid);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return {
      errors: {
        _form: ["An error occurred during Google sign-in. Please try again."],
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  return {
    success: true,
  };
}
