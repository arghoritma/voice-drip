import React from "react";
import Avatar from "./ui/Avatar";

export default function RightSideBar() {
  return (
    <div className="hidden md:block md:col-span-3">
      <div className="card bg-base-100 shadow-xl sticky top-20">
        <div className="card-body">
          <h3 className="font-bold text-lg">Trending Tags</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="badge badge-primary">#UI/UX</div>
            <div className="badge badge-secondary">#Mobile</div>
            <div className="badge badge-accent">#Security</div>
            <div className="badge badge-ghost">#Performance</div>
          </div>

          <h3 className="font-bold text-lg mt-6">Active Users</h3>
          <div className="space-y-4 mt-2">
            {[
              { name: "John Doe", status: "online" },
              { name: "Alice Smith", status: "online" },
              { name: "Bob Johnson", status: "away" },
            ].map((user, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-base-content/70">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
