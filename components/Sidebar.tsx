import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="col-span-3">
      <div className="card bg-base-100 shadow-xl sticky top-20">
        <div className="card-body">
          <div className="space-y-2">
            <Link
              href="/feed"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              Feed
            </Link>
            <Link
              href="/features"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              Features
            </Link>
            <Link
              href="/bugs"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              Bug Reports
            </Link>
            <Link
              href="/requests"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
