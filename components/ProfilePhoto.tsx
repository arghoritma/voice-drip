/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useActionState } from "react";
import { Camera, User, Save } from "lucide-react";
import { getProfile } from "@/actions/profile";
import { uploadAvatar } from "@/actions/uploads";

export default function ProfilePhoto() {
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: profile } = await getProfile();

        if (profile) {
          setAvatar(profile.avatar || "");
        }
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };
    getUserData();
  }, []);

  const initialState = {
    error: false,
    data: "",
    success: false,
  };

  const [state, formAction, loading] = useActionState(
    uploadAvatar,
    initialState
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const formData = new FormData();
      formData.append("file", file);
    }
  };

  return (
    <div className="w-full lg:w-1/3 flex items-center align-middle justify-center">
      <div className="flex flex-col items-center bg-base-200 p-4 sm:p-8 rounded-xl">
        <div className="avatar">
          <div className="w-32 sm:w-40 rounded-full ring-3 ring-primary ring-offset-base-100 ring-offset-4 hover:scale-105 transition-transform">
            {preview ? (
              <img src={preview} alt="Preview" className="object-cover" />
            ) : avatar ? (
              <img src={avatar} alt="Profile" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-base-200">
                <User className="w-20 h-20 text-base-content opacity-40" />
              </div>
            )}
          </div>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-2 w-full items-center"
        >
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
              name="file"
            />
          </label>
          {preview && (
            <button
              type="submit"
              className="btn btn-secondary gap-2 text-sm sm:text-base w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Save className="h-4 sm:h-5 w-4 sm:w-5" />
              )}
              Save
            </button>
          )}
        </form>

        {state.error && (
          <div className="alert alert-error mt-4">
            <span>{state.data}</span>
          </div>
        )}
      </div>
    </div>
  );
}
