"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Todo Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Todo List</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Tasks</div>
                <div className="stat-value">25</div>
                <div className="stat-desc">12 completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Task Management</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Active Tasks</div>
                <div className="stat-value">8</div>
                <div className="stat-desc">3 due today</div>
              </div>
            </div>
          </div>
        </div>

        {/* Files Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Files</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Files</div>
                <div className="stat-value">15</div>
                <div className="stat-desc">2 uploaded today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Recent Activities</h2>
          <button className="btn btn-primary flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-2 sm:p-6">
            <div className="overflow-x-auto">
              <table className="table table-sm sm:table-md">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Todo</td>
                    <td>Learn Next.js</td>
                    <td>2024-01-20</td>
                    <td>
                      <span className="badge badge-success">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Task</td>
                    <td>Project Documentation</td>
                    <td>2024-01-19</td>
                    <td>
                      <span className="badge badge-warning">In Progress</span>
                    </td>
                  </tr>
                  <tr>
                    <td>File</td>
                    <td>document.pdf uploaded</td>
                    <td>2024-01-18</td>
                    <td>
                      <span className="badge badge-info">New</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="btn btn-primary w-full">Create Todo</button>
          <button className="btn btn-secondary w-full">Add Task</button>
          <button className="btn btn-accent w-full">Upload File</button>
        </div>
      </div>
    </div>
  );
}
