import React from "react";
import menuItems from "@/lib/menus";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold">App Name</h2>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link href={item.path} className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
