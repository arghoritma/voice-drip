import { NextResponse } from "next/server";
import db from "@/services/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, name, uid, avatar } = await request.json();

    // Cek user di database
    let dbUser = await db("users").where({ email }).first();

    if (!dbUser) {
      // Buat user baru

      const hashedPassword = await bcrypt.hash("google-pwd", 10);
      dbUser = (
        await db("users")
          .insert({
            id: uid,
            email,
            username: name,
            password: hashedPassword,
            role: "user",
            avatar,
            created_at: new Date(),
            updated_at: new Date(),
          })
          .returning("*")
      )[0];
    }

    //TODO: Generate token

    // TODO: Create session

    const response = NextResponse.json({
      message: "Login berhasil",
      user: dbUser,
    });

    //TODO: Set cookie

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Login gagal" }, { status: 500 });
  }
}

export const config = {
  runtime: "nodejs",
};
