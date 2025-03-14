"use client";

import React, { useState } from "react";

export default function RoadmapPage() {
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    status: "all",
    platform: "all",
  });

  const roadmapItems = [
    {
      id: "1",
      title: "Enhanced User Dashboard",
      description:
        "Improving user dashboard with better analytics and personalized views",
      status: "in_progress",
      type: "feature",
      platform: "Web App",
      votes: 156,
      created_at: "2024-01-15",
    },
    {
      id: "2",
      title: "Mobile Responsive Bug Fix",
      description: "Fixing layout issues on mobile devices across all pages",
      status: "open",
      type: "bug",
      platform: "Mobile App",
      votes: 89,
      created_at: "2024-01-10",
    },
    {
      id: "3",
      title: "Performance Optimization",
      description:
        "Improving application loading speed and overall performance",
      status: "planned",
      type: "improvement",
      platform: "All Platforms",
      votes: 234,
      created_at: "2024-01-05",
    },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Roadmap</h1>
        <p className="text-gray-600">
          Track our upcoming features and improvements
        </p>
      </div>

      <div className="bg-base-200 p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <div className="filter-group">
            <label className="text-sm font-medium mb-2 block">Type</label>
            <select
              className="select select-bordered w-full"
              value={activeFilters.type}
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, type: e.target.value })
              }
            >
              <option value="all">All Types</option>
              <option value="feature">Features</option>
              <option value="bug">Bugs</option>
              <option value="improvement">Improvements</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="text-sm font-medium mb-2 block">Status</label>
            <select
              className="select select-bordered w-full"
              value={activeFilters.status}
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, status: e.target.value })
              }
            >
              <option value="all">All Status</option>
              <option value="in_progress">In Progress</option>
              <option value="open">Open</option>
              <option value="planned">Planned</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="text-sm font-medium mb-2 block">Platform</label>
            <select
              className="select select-bordered w-full"
              value={activeFilters.platform}
              onChange={(e) =>
                setActiveFilters({ ...activeFilters, platform: e.target.value })
              }
            >
              <option value="all">All Platforms</option>
              <option value="web">Web App</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {roadmapItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title">{item.title}</h2>
                <div className="flex gap-2">
                  <span
                    className={`badge ${
                      item.type === "feature"
                        ? "badge-primary"
                        : item.type === "bug"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span
                    className={`badge ${
                      item.status === "in_progress"
                        ? "badge-warning"
                        : item.status === "open"
                        ? "badge-error"
                        : "badge-secondary"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4">
                  <span className="badge badge-outline">{item.platform}</span>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                    <span>{item.votes}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  Added {item.created_at}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="btn btn-primary">Load More</button>
      </div>
    </div>
  );
}
