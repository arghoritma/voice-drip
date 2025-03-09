"use server";

import db from "@/services/db";
import { revalidatePath } from "next/cache";

export async function createPlatform(
  formData: FormData
): Promise<{ success: boolean; errors: { _form?: string[] } }> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const logo = formData.get("logo") as string;

  try {
    await db.transaction(async (trx) => {
      await trx("platforms").insert({
        id: crypto.randomUUID(),
        name,
        description,
        logo,
      });
    });

    revalidatePath("/admin/platforms");
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: {
        _form: [
          "Failed to create platform. Please try again. ",
          error as string,
        ],
      },
    };
  }
}

export async function updatePlatform(platformId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const logo = formData.get("logo") as string;

  try {
    await db.transaction(async (trx) => {
      await trx("platforms").where({ id: platformId }).update({
        name,
        description,
        logo,
      });
    });

    revalidatePath("/dashboard/platforms");
    return { success: true, errors: {} };
  } catch (error) {
    return {
      errors: {
        _form: [
          "Failed to update platform. Please try again.",
          error as string,
        ],
      },
    };
  }
}

export async function deletePlatform(platformId: string) {
  try {
    await db.transaction(async (trx) => {
      await trx("platforms").where({ id: platformId }).delete();
    });

    revalidatePath("/dashboard/platforms");
    return { success: true, errors: {} };
  } catch (error) {
    return {
      errors: {
        _form: [
          "Failed to delete platform. Please try again.",
          error as string,
        ],
      },
    };
  }
}

export async function getPlatforms() {
  try {
    const platforms = await db("platforms").select("*");
    return platforms;
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function getPlatform(platformId: string) {
  try {
    const platform = await db("platforms").where({ id: platformId }).first();
    if (!platform) {
      throw new Error("Platform not found");
    }
    return platform;
  } catch (error) {
    return {
      error: error,
    };
  }
}
