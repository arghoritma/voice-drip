import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";

export async function GET() {
  const { isAuth, userId } = await verifySession();

  if (!isAuth) {
    return NextResponse.json(
      { message: "Not authenticated", isAuth },
      { status: 401 }
    );
  }

  return NextResponse.json({ userId, isAuth });
}
