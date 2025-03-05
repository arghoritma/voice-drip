"use client";

import React, { useState } from "react";
import { logout } from "@/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="flex items-center justify-between w-full gap-2"
      onClick={handleLogout}
    >
      <span>{loading ? "Loging Out..." : "Logout"}</span>
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <LogOut size={16} />
      )}
    </button>
  );
}
