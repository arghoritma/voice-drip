"use server";

import db from "@/services/db";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  role: string;
}

interface UserResponse {
  success: boolean;
  users: UserProps[];
  error: Error | null;
}

export async function GetUsers(): Promise<UserResponse> {
  try {
    const users = await db.select().from("users");
    return {
      success: true,
      users: users,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      users: [],
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export async function GetUserById(id: string): Promise<UserResponse> {
  try {
    const user = await db.select().from("users").where("id", id).first();
    return {
      success: true,
      users: [user],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      users: [],
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export async function DeleteUser(id: string): Promise<UserResponse> {
  try {
    const user = await db.select().from("users").where("id", id).first();
    if (!user) {
      return {
        success: false,
        users: [],
        error: new Error("User not found"),
      };
    }

    await db.transaction(async (trx) => {
      await trx("activity_log").where("user_id", id).delete();
      await trx("comments").where("user_id", id).delete();
      await trx("votes").where("user_id", id).delete();
      await trx("roadmaps").where("user_id", id).delete();
      await trx("requests").where("user_id", id).delete();
      await trx("bug_reports").where("user_id", id).delete();
      await trx("features").where("user_id", id).delete();
      await trx("sessions").where("user_id", id).delete();
      await trx("files").where("uploaded_by", id).delete();
      await trx("users").where("id", id).delete();
    });

    return {
      success: true,
      users: [user],
      error: null,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      users: [],
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export async function MakeAdmin(id: string): Promise<UserResponse> {
  try {
    const user = await db.select().from("users").where("id", id).first();
    if (!user) {
      return {
        success: false,
        users: [],
        error: new Error("User not found"),
      };
    }

    await db.update({ role: "admin" }).from("users").where("id", id);
    const updatedUser = await db.select().from("users").where("id", id).first();

    return {
      success: true,
      users: [updatedUser],
      error: null,
    };
  } catch (error) {
    console.error("Error making user admin:", error);
    return {
      success: false,
      users: [],
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export async function MakeUser(id: string): Promise<UserResponse> {
  try {
    const user = await db.select().from("users").where("id", id).first();
    if (!user) {
      return {
        success: false,
        users: [],
        error: new Error("User not found"),
      };
    }

    await db.update({ role: "user" }).from("users").where("id", id);
    const updatedUser = await db.select().from("users").where("id", id).first();

    return {
      success: true,
      users: [updatedUser],
      error: null,
    };
  } catch (error) {
    console.error("Error making admin to user:", error);
    return {
      success: false,
      users: [],
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}
