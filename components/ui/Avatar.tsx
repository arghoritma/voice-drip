"use client";

import React, { useState, useEffect } from "react";
import { User } from "lucide-react";

export default function Avatar() {
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("/api/users");
        const userData = await response.json();
        if (userData) {
          setAvatar(userData.avatar || "");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        {avatar ? (
          <img src={avatar} alt="Profile" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-200">
            <User className="h-5 w-5 text-base-content opacity-40" />
          </div>
        )}
      </div>
    </div>
  );
}
