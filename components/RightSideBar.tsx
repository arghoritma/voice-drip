import React from "react";
import Avatar from "./ui/Avatar";

export default function RightSideBar() {
  return (
    <div className="hidden md:block md:col-span-3">
      <div className="card bg-base-100 shadow-xl sticky top-20">
        <div className="card-body">
          <h3 className="font-bold text-lg">Trending Tags</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="badge badge-primary">#Feature</div>
            <div className="badge badge-secondary">#Bug</div>
            <div className="badge badge-accent">#Improvement</div>
            <div className="badge badge-ghost">#Enhancement</div>
          </div>

          <h3 className="font-bold text-lg mt-6">Active Users</h3>
          <div className="space-y-4 mt-2">
            {[
              {
                name: "Issue Reporter",
                status: "online",
                email: "reporter@example.com",
              },
              {
                name: "Feature Requester",
                status: "online",
                email: "requester@example.com",
              },
              {
                name: "Bug Tracker",
                status: "away",
                email: "bugtracker@example.com",
              },
            ].map((user, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar
                  className="h-10 w-10"
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                />
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
