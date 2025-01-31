import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import db from "@/services/db";

export async function POST(request: Request) {
  try {
    const { email, username, password, phone_number } = await request.json();

    // Format nomor HP
    let formattedPhone = phone_number.replace(/^0+/, "62");
    if (!formattedPhone.startsWith("62")) {
      formattedPhone = "62" + formattedPhone;
    }

    // Cek email sudah terdaftar
    const existingUser = await db("users").where({ email }).first();

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Cek nomor hp sudah terdaftar
    const existingPhone = await db("users")
      .where({ phone_number: formattedPhone })
      .first();

    if (existingPhone) {
      return NextResponse.json(
        { message: "Nomor HP sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    const newUser = await db("users")
      .insert({
        id: uuidv4(),
        email,
        username,
        phone_number: formattedPhone,
        password: hashedPassword,
        role: "user",
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
      })
      .returning(["id", "email", "username", "role", "created_at"]);

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: newUser[0],
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
