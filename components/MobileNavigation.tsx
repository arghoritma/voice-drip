"use client";

import React from "react";
import Link from "next/link";
import { Home, Lightbulb, Bug } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 z-50">
      <div className="flex justify-around items-center">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/" ? "text-primary" : ""
          }`}
        >
          <Home />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/features"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/features" ? "text-primary" : ""
          }`}
        >
          <Lightbulb />
          <span className="text-xs">Features</span>
        </Link>
        <Link
          href="/bugs"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/bugs" ? "text-primary" : ""
          }`}
        >
          <Bug />
          <span className="text-xs">Bug Reports</span>
        </Link>
      </div>
    </div>
  );
}
