import React from "react";
import { Clock } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Fetch user data
  const user = {
    id: "usr_1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    avatar: "https://ui-avatars.com/api/?name=John+Doe",
    created_at: "2023-01-01",
    updated_at: "2024-01-20",
  };

  // Fetch activity logs
  const activityLogs = [
    {
      id: "act_1",
      user_id: "usr_1",
      activity_type: "created",
      object_type: "feature",
      object_id: 1,
      description: "Created new feature request: Authentication System",
      created_at: "2024-01-15T10:30:00",
    },
    {
      id: "act_2",
      user_id: "usr_1",
      activity_type: "commented",
      object_type: "bug",
      object_id: 2,
      description: "Commented on bug report: Login page error",
      created_at: "2024-01-14T15:20:00",
    },
    {
      id: "act_3",
      user_id: "usr_1",
      activity_type: "voted",
      object_type: "request",
      object_id: 3,
      description: "Voted on feature request: Dark Mode Implementation",
      created_at: "2024-01-13T09:15:00",
    },
    {
      id: "act_4",
      user_id: "usr_1",
      activity_type: "status_changed",
      object_type: "feature",
      object_id: 4,
      description: "Updated feature status to in_progress: API Integration",
      created_at: "2024-01-12T14:45:00",
    },
  ];

  // Recent Features
  const recentFeatures = [
    {
      id: "feat_1",
      title: "Authentication System",
      description: "Implement secure user authentication with JWT",
      status: "in_progress",
      created_at: "2024-01-15T10:30:00",
      updated_at: "2024-01-16T08:20:00",
      user_id: "usr_1",
      tags: ["Security", "Backend"],
    },
    {
      id: "feat_2",
      title: "Dark Mode Support",
      description: "Add system-wide dark mode support",
      status: "planned",
      created_at: "2024-01-14T09:15:00",
      updated_at: "2024-01-14T09:15:00",
      user_id: "usr_1",
      tags: ["UI/UX", "Frontend"],
    },
  ];

  // Recent Bug Reports
  const recentBugs = [
    {
      id: "bug_1",
      title: "Login Page Error",
      description: "Users unable to login after password reset",
      status: "in_progress",
      created_at: "2024-01-14T15:20:00",
      updated_at: "2024-01-15T11:30:00",
      user_id: "usr_1",
      tags: ["Critical", "Authentication"],
    },
    {
      id: "bug_2",
      title: "Mobile Layout Issues",
      description: "Dashboard not rendering correctly on mobile devices",
      status: "open",
      created_at: "2024-01-13T16:45:00",
      updated_at: "2024-01-13T16:45:00",
      user_id: "usr_1",
      tags: ["UI/UX", "Mobile"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24 h-24 flex items-center justify-center text-3xl">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-base-content/60">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-base-content/60">
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Activity History</h2>
          <ul className="timeline timeline-vertical">
            {activityLogs.map((log) => (
              <li key={log.id} className="timeline-item">
                <div className="timeline-middle">
                  <div className={`badge badge-${log.activity_type}`}></div>
                </div>
                <div className="timeline-end mb-10">
                  <p className="font-bold">{log.description}</p>
                  <time className="text-sm text-base-content/60">
                    {new Date(log.created_at).toLocaleString()}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Features</h2>
            <div className="divide-y">
              {recentFeatures.map((item) => (
                <div key={item.id} className="py-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-base-content/60">{item.description}</p>
                  <div className="flex gap-2 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="badge badge-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="badge mt-2">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Bug Reports</h2>
            <div className="divide-y">
              {recentBugs.map((item) => (
                <div key={item.id} className="py-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-base-content/60">{item.description}</p>
                  <div className="flex gap-2 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="badge badge-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="badge mt-2">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
