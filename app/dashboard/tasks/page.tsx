import React from "react";
import { Plus, Pencil, Trash } from "lucide-react";

export default function TaskPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button className="btn btn-primary flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add New Task
        </button>
      </div>

      <div className="space-y-4">
        {/* Task List */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="card-title">Complete Project Documentation</h3>
                <p className="text-sm text-base-content/60">Due: 2024-01-20</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="btn btn-outline btn-sm flex items-center gap-1 flex-1 sm:flex-initial">
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn btn-error btn-sm flex items-center gap-1 flex-1 sm:flex-initial">
                  <Trash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Task Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Add New Task</h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Due Date</span>
                  </label>
                  <input type="date" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
              >
                Save Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
