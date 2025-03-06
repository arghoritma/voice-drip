import React from "react";
import Link from "next/link";
import { Home, Lightbulb, Bug, FileQuestion } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden md:block md:col-span-3">
      <div className="card bg-base-100 shadow-xl sticky top-20">
        <div className="card-body">
          <div className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <Home size={20} />
              Feed
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <Lightbulb size={20} />
              Features
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <Bug size={20} />
              Bug Reports
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <FileQuestion size={20} />
              Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
