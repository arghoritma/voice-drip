"use client";

import React from "react";
import Link from "next/link";
import { Home, Lightbulb, Bug, Rocket, Activity } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 z-50">
      <div className="flex justify-around items-center relative">
        <Link
          href="/features"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/features" ? "text-primary" : ""
          }`}
        >
          <Lightbulb />
        </Link>
        <Link
          href="/improvement"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/improvement" ? "text-primary" : ""
          }`}
        >
          <Rocket />
        </Link>
        <Link
          href="/"
          className={`flex flex-col items-center justify-center bg-primary rounded-full p-4 shadow-lg ${
            pathname === "/" ? "text-white" : ""
          }`}
        >
          <Home size={24} />
        </Link>
        <Link
          href="/bugs"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/bugs" ? "text-primary" : ""
          }`}
        >
          <Bug />
        </Link>
        <Link
          href="/status"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/status" ? "text-primary" : ""
          }`}
        >
          <Activity />
        </Link>
      </div>
    </div>
  );
}
