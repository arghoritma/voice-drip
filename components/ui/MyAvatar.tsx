/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { getProfile } from "@/actions/profile";

export default function Avatar() {
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    const getAvatar = async () => {
      const { data: action } = await getProfile();
      if (action.avatar) {
        setAvatar(action.avatar);
        console.log(action.avatar);
      }
    };
    getAvatar();
  }, []);
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        {avatar ? (
          <img
            loading="lazy"
            src={avatar}
            alt="Profile"
            className="object-cover"
            onError={() => {
              setAvatar(null);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-200">
            <User className="h-5 w-5 text-base-content opacity-40" />
          </div>
        )}
      </div>
    </div>
  );
}
