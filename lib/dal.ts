import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import db from "@/services/db";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.id) {
    redirect("/auth/login");
  }

  const user = await db("sessions")
    .select("user_id")
    .where({ id: session.id })
    .first();

  return { isAuth: true, userId: user?.user_id };
});
