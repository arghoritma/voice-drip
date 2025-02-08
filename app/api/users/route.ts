import { NextResponse } from "next/server";
import db from "@/services/db";
import { verifySession } from "@/lib/dal";

export async function GET(request: Request) {
  try {
    const id = (await verifySession()).userId;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const user = await db("users")
      .select(
        "id",
        "email",
        "username",
        "phone_number",
        "role",
        "avatar",
        "created_at",
        "updated_at"
      )
      .where({ id })
      .first();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const phone_number = formData.get("phone_number") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const avatar = formData.get("avatar") as File;

    let avatarUrl = "";

    if (avatar) {
      const { v4: uuidv4 } = require("uuid");
      const { initializeApp } = require("firebase/app");
      const {
        getStorage,
        ref,
        uploadBytes,
        getDownloadURL,
      } = require("firebase/storage");

      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      };

      const firebaseApp = initializeApp(firebaseConfig);
      const storage = getStorage(firebaseApp);

      const fileExtension = avatar.name.split(".").pop();
      const fileName = `avatars/${uuidv4()}.${fileExtension}`;
      const storageRef = ref(storage, fileName);

      const buffer = await avatar.arrayBuffer();
      await uploadBytes(storageRef, buffer, {
        contentType: avatar.type,
      });

      avatarUrl = await getDownloadURL(storageRef);
    }

    const [user] = await db("users")
      .insert({
        email,
        username,
        phone_number,
        password,
        role,
        avatar: avatarUrl,
      })
      .returning("*");

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, username, phone_number, password, role } = body;

    const [updatedUser] = await db("users")
      .where({ id })
      .update({
        email,
        username,
        phone_number,
        password,
        role,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const [deletedUser] = await db("users")
      .where({ id })
      .delete()
      .returning("*");

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
