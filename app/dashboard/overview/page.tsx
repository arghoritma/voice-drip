  "use client";

  import { useEffect, useState } from "react";

  export default function DashboardPage() {
    const [stats, setStats] = useState({
      totalUsers: 0,
      totalTeams: 0,
      totalProjects: 0,
      totalTasks: 0,
      totalTodos: 0,
    });

    useEffect(() => {
      // Dummy data based on erd.dbml structure
      const dummyData = {
        users: [
          { id: '1', email: 'user1@example.com', username: 'user1', phone_number: '1234567890', role: 'admin' },
          { id: '2', email: 'user2@example.com', username: 'user2', phone_number: '0987654321', role: 'user' },
          { id: '3', email: 'user3@example.com', username: 'user3', phone_number: '1122334455', role: 'user' }
        ],
        teams: [
          { id: '1', name: 'Team Alpha', description: 'Development team' },
          { id: '2', name: 'Team Beta', description: 'Design team' }
        ],
        projects: [
          { id: '1', team_id: '1', name: 'Project X', description: 'Main project', deadline: '2024-12-31' },
          { id: '2', team_id: '1', name: 'Project Y', description: 'Side project', deadline: '2024-06-30' },
          { id: '3', team_id: '2', name: 'Project Z', description: 'Design project', deadline: '2024-09-30' }
        ],
        tasks: [
          { id: '1', project_id: '1', title: 'Task 1', description: 'Do something', status: 'In Progress' },
          { id: '2', project_id: '1', title: 'Task 2', description: 'Do another thing', status: 'To-Do' },
          { id: '3', project_id: '2', title: 'Task 3', description: 'Important task', status: 'Done' },
          { id: '4', project_id: '3', title: 'Task 4', description: 'Design task', status: 'In Progress' }
        ],
        todos: [
          { id: '1', title: 'Todo 1', description: 'Personal todo', date: '2024-01-20', status: 'pending', user_id: '1' },
          { id: '2', title: 'Todo 2', description: 'Work todo', date: '2024-01-21', status: 'completed', user_id: '2' },
          { id: '3', title: 'Todo 3', description: 'Project todo', date: '2024-01-22', status: 'pending', user_id: '3' }
        ]
      };

      setStats({
        totalUsers: dummyData.users.length,
        totalTeams: dummyData.teams.length,
        totalProjects: dummyData.projects.length,
        totalTasks: dummyData.tasks.length,
        totalTodos: dummyData.todos.length
      });
    }, []);

    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Total Users</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Total Teams</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stats.totalTeams}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Total Projects</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">Total Tasks</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stats.totalTasks}</div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between p-6">
              <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
            </div>
            <div className="p-6">
              {/* Overview content */}
            </div>
          </div>
          <div className="col-span-3 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between p-6">
              <h3 className="font-semibold leading-none tracking-tight">Recent Activities</h3>
            </div>
            <div className="p-6">
              {/* Recent activities content */}
            </div>
          </div>
        </div>
      </div>
    );
  }