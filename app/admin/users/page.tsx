/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Shield, Trash } from "lucide-react";
import { GetUsers, DeleteUser, MakeAdmin } from "@/actions/users";
import dayjs from "dayjs";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
}

export default function Page() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await GetUsers();
      if (response.success) {
        setUsers(response.users);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = async (id: string) => {
    const response = await DeleteUser(id);
    if (response.success) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const makeAdmin = async (id: string) => {
    const response = await MakeAdmin(id);
    if (response.success) {
      const updatedUsers = users.map((user) =>
        user.id === id ? response.users[0] : user
      );
      setUsers(updatedUsers);
    }
  };

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
        <table className="table table-sm">
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
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-sm">{user.email}</td>
                <td className="text-sm">
                  {dayjs(user.created_at).format("DD/MM/YYYY HH:mm")}
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-xs"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-100 menu p-2 shadow-sm bg-base-100 rounded-box w-52 "
                    >
                      <li>
                        <a className="flex items-center gap-2 text-sm">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={() => makeAdmin(user.id)}
                          className="flex items-center gap-2 text-sm w-full text-left"
                        >
                          <Shield className="h-3 w-3" />
                          Make Admin
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-2 text-error text-sm w-full text-left"
                        >
                          <Trash className="h-3 w-3" />
                          Delete
                        </button>
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
