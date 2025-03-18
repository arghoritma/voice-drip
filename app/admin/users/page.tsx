/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Shield, Trash } from "lucide-react";
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
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false);
    }
  };

  const makeAdmin = async (id: string) => {
    const response = await MakeAdmin(id);
    if (response.success) {
      window.location.reload();
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
        <table className="table table-sm h-full">
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
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    Actions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 shadow-xl rounded-2xl">
            <div className="flex items-center gap-4 mb-6 border-b pb-3">
              <div className="flex w-full">
                <div className="flex-none w-1/4 items-center justify-center">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full">
                      <img src={selectedUser.avatar} alt={selectedUser.name} />
                    </div>
                  </div>
                </div>
                <div className="flex-grow w-3/4">
                  <div className="flex flex-col h-full justify-between">
                    <h3 className="font-bold text-2xl text-primary">
                      Actions for {selectedUser.name}
                    </h3>
                    <div className="flex space-x-3 mt-4">
                      <button className="btn btn-primary">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => makeAdmin(selectedUser.id)}
                        className="btn btn-success"
                      >
                        <Shield className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(selectedUser.id)}
                        className="btn btn-error"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action mt-8">
              <button
                className="btn btn-neutral"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
