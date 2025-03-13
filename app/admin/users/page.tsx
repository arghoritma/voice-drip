/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { MoreHorizontal, Pencil, Shield, Trash } from "lucide-react";

export default function Page() {
  const dummyUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      created_at: "2023-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      created_at: "2023-01-02",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      created_at: "2023-01-03",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-xs"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-1 menu p-2 shadow-sm bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Make Admin
                        </a>
                      </li>
                      <li>
                        <a className="flex items-center gap-2 text-error">
                          <Trash className="h-4 w-4" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
