"use server";

import db from "@/services/db";
import { revalidatePath } from "next/cache";
import { Platform } from "@/types";

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

export async function updatePlatform(
  prev: { succes: boolean; error?: Error | undefined },
  formData: FormData
): Promise<{ succes: boolean; error?: Error }> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const logo = formData.get("logo") as string;

  try {
    await db.transaction(async (trx) => {
      await trx("platforms").where({ id }).update({
        name,
        description,
        logo,
      });
    });

    revalidatePath("/dashboard/platforms/" + id);
    return { succes: true };
  } catch (error) {
    return {
      succes: false,
      error: error as Error,
    };
  }
}

export async function deletePlatform(platformId: string): Promise<{
  success: boolean;
  errors: { _form?: string[] };
}> {
  try {
    await db.transaction(async (trx) => {
      await trx("platforms").where({ id: platformId }).delete();
    });

    revalidatePath("/dashboard/platforms");
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: {
        _form: [
          "Failed to delete platform. Please try again.",
          error as string,
        ],
      },
    };
  }
}

export async function getPlatforms(): Promise<{
  success: boolean;
  data: Platform[];
  error: Error | null;
}> {
  try {
    const platforms = await db("platforms").select("*");
    return { success: true, data: platforms, error: null };
  } catch (error) {
    return { success: false, data: [], error: error as Error };
  }
}

export async function getPlatform(platformId: string): Promise<{
  success: boolean;
  data: Platform | null;
  error: Error | null;
}> {
  try {
    const platform = await db("platforms").where({ id: platformId }).first();
    if (!platform) {
      throw new Error("Platform not found");
    }
    return { success: true, data: platform, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export async function test(formData: FormData) {
  const id = formData.get("platform");
  console.log(id);
}
