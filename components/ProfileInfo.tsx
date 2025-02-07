"use client";

import React, { useEffect, useState } from "react";

export default function ProfileInfo() {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="text-sm font-semibold">{user.username}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
