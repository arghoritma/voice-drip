import { NextResponse } from "next/server";
import { verifySession } from "@/lib/dal";

export async function GET() {
  try {
    const { isAuth, userId } = await verifySession();

    return NextResponse.json({
      success: true,
      authenticated: isAuth,
      userId: userId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 401 }
    );
  }
}
