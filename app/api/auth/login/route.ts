import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/config/db";
import { encrypt } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    // Cek user di database
    const user = await db("users").where({ email }).first();

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Generate token JWT
    const token = await encrypt({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie dan kirim response
    const response = NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set cookie dengan token
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
