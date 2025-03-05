"use client";

import React from "react";
import Link from "next/link";
import { UserCircle, Filter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 z-50">
      <div className="flex justify-around items-center">
        <Link
          href="/feed"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/feed" ? "text-primary" : ""
          }`}
        >
          <UserCircle />
          <span className="text-xs">Feed</span>
        </Link>
        <Link
          href="/features"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/features" ? "text-primary" : ""
          }`}
        >
          <Filter />
          <span className="text-xs">Features</span>
        </Link>
        <Link
          href="/bugs"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/bugs" ? "text-primary" : ""
          }`}
        >
          <Filter />
          <span className="text-xs">Bugs</span>
        </Link>
        <Link
          href="/requests"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/requests" ? "text-primary" : ""
          }`}
        >
          <Filter />
          <span className="text-xs">Requests</span>
        </Link>
      </div>
    </div>
  );
}
