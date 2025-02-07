import React from "react";
import Link from "next/link";
import { UserCircle, Settings, LogOut, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl md:hidden">Todos</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-3">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator ">
              <Bell className="h-5 w-5" />
              <span className="badge badge-sm indicator-item">3</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow rounded-xl"
          >
            <div className="card-body bg-neutral text-neutral-content rounded-xl">
              <span className="text-lg font-bold">Notifications</span>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm">New message from John</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm">Your task was completed</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm">Meeting reminder</p>
                    <p className="text-xs text-gray-400">3 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="card-actions mt-2">
                <button className="btn btn-primary btn-block btn-sm rounded-lg">
                  View all notifications
                </button>
              </div>
            </div>{" "}
          </div>
        </div>{" "}
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="bg-neutral text-neutral-content menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="px-4 py-3">
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
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <li>
              <Link href="/dashboard/profile" className="justify-between">
                <div className="flex items-center gap-2">
                  <UserCircle size={16} />
                  Profile
                </div>
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </Link>
            </li>
            <li>
              <Link href="/logout" className="flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </Link>
            </li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
}
