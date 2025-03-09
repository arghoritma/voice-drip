"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 border rounded-lg p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="mt-4">
            <h2 className="text-4xl font-bold mb-2">Oops!</h2>
            <p>Page not found: {pathname}</p>
          </div>
          <div className="mt-8">
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
