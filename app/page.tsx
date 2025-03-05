"use client";

import { useState } from "react";
import {
  UserCircle,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Plus,
  Bell,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function Home() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="card bg-base-100 shadow-xl sticky top-20">
              <div className="card-body">
                <div className="space-y-2">
                  <a
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 ${
                      activeTab === "feed" ? "bg-base-200" : ""
                    }`}
                    onClick={() => setActiveTab("feed")}
                  >
                    <UserCircle /> Feed
                  </a>
                  <a
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 ${
                      activeTab === "features" ? "bg-base-200" : ""
                    }`}
                    onClick={() => setActiveTab("features")}
                  >
                    <Filter /> Features
                  </a>
                  <a
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 ${
                      activeTab === "bugs" ? "bg-base-200" : ""
                    }`}
                    onClick={() => setActiveTab("bugs")}
                  >
                    <Filter /> Bug Reports
                  </a>
                  <a
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 ${
                      activeTab === "requests" ? "bg-base-200" : ""
                    }`}
                    onClick={() => setActiveTab("requests")}
                  >
                    <Filter /> Requests
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg p-4 z-50">
            <div className="flex justify-around items-center">
              <button
                onClick={() => setActiveTab("feed")}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === "feed" ? "text-primary" : ""
                }`}
              >
                <UserCircle />
                <span className="text-xs">Feed</span>
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === "features" ? "text-primary" : ""
                }`}
              >
                <Filter />
                <span className="text-xs">Features</span>
              </button>
              <button
                onClick={() => setActiveTab("bugs")}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === "bugs" ? "text-primary" : ""
                }`}
              >
                <Filter />
                <span className="text-xs">Bugs</span>
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === "requests" ? "text-primary" : ""
                }`}
              >
                <Filter />
                <span className="text-xs">Requests</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-6">
            {/* Create Post Card */}
            <div className="card bg-base-100 shadow-xl mb-4">
              <div className="card-body">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10" />
                  <input
                    type="text"
                    placeholder="Share your thoughts..."
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="btn btn-primary">Post</button>
                </div>
              </div>
            </div>

            {/* Feed Items */}
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  user: {
                    name: "John Doe",
                    avatar: "https://ui-avatars.com/api/?name=John+Doe",
                  },
                  type: "feature",
                  title: "Dark Mode Implementation",
                  description:
                    "We're working on implementing a system-wide dark mode for better night viewing experience.",
                  status: "in_progress",
                  likes: 42,
                  comments: 8,
                  created_at: "2024-01-25T14:30:00",
                  tags: ["UI/UX", "Enhancement"],
                },
                {
                  id: 2,
                  user: {
                    name: "Alice Smith",
                    avatar: "https://ui-avatars.com/api/?name=Alice+Smith",
                  },
                  type: "bug",
                  title: "Login Page Issue",
                  description:
                    "Users are experiencing intermittent login failures on the mobile app.",
                  status: "open",
                  likes: 15,
                  comments: 23,
                  created_at: "2024-01-25T13:15:00",
                  tags: ["Mobile", "Critical"],
                },
              ].map((item) => (
                <div key={item.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex gap-3">
                        <Avatar src={item.user.avatar} className="w-10 h-10" />
                        <div>
                          <h3 className="font-bold">{item.user.name}</h3>
                          <p className="text-sm text-base-content/70">
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="badge badge-primary">{item.type}</div>
                    </div>

                    <h2 className="card-title mt-4">{item.title}</h2>
                    <p>{item.description}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag, index) => (
                        <div key={index} className="badge badge-outline">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <button className="btn btn-ghost btn-sm gap-2">
                        <Heart size={18} /> {item.likes}
                      </button>
                      <button className="btn btn-ghost btn-sm gap-2">
                        <MessageCircle size={18} /> {item.comments}
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
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
                      <Avatar className="w-8 h-8" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-base-content/70">
                          {user.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
