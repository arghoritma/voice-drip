"use client";

import React, { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";
import { getProfile } from "@/actions/profile";

export default function ProfilePhoto() {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const profile = await getProfile();

        if (profile) {
          setAvatar(profile.avatar || "");
        }
      } catch (error) {}
    };
    getUserData();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/users/avatar", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload avatar");

        const data = await response.json();

        setAvatar(data.url);
      } catch (error) {}
    }
  };
  return (
    <div className="w-full lg:w-1/3 flex items-center align-middle justify-center">
      <div className="flex flex-col items-center bg-base-200 p-4 sm:p-8 rounded-xl">
        <div className="avatar">
          <div className="w-32 sm:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 hover:scale-105 transition-transform">
            {avatar ? (
              <img src={avatar} alt="Profile" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-base-200">
                <User className="w-20 h-20 text-base-content opacity-40" />
              </div>
            )}
          </div>
        </div>
        <label
          htmlFor="image-upload"
          className="btn btn-primary mt-4 sm:mt-6 gap-2 hover:btn-secondary transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          <Camera className="h-4 sm:h-5 w-4 sm:w-5" />

          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}
