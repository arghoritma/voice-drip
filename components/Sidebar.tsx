import React from "react";
import Link from "next/link";
import { Home, Lightbulb, Bug } from "lucide-react";
import { Users, Settings, LineChart, Gamepad } from "lucide-react";
import { GetIsAdmin } from "@/actions/profile";

export default async function Sidebar() {
  const isAdmin = await GetIsAdmin();

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
              Home
            </Link>
            <Link
              href="/features"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <Lightbulb size={20} />
              Features
            </Link>
            <Link
              href="/bugs"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
            >
              <Bug size={20} />
              Bug Reports
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                >
                  <Users size={20} />
                  Users
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                >
                  <Settings size={20} />
                  Settings
                </Link>
                <Link
                  href="/admin/analytics"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                >
                  <LineChart size={20} />
                  Analytics
                </Link>
                <Link
                  href="/admin/platforms"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                >
                  <Gamepad size={20} />
                  Platforms
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
