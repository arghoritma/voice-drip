/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Shield, Trash, User } from "lucide-react";
import { GetUsers, DeleteUser, MakeAdmin, MakeUser } from "@/actions/users";
import dayjs from "dayjs";

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  role: string;
}

export default function Page() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

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
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      user.role === (activeTab === "users" ? "user" : "admin")
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

  const makeUser = async (id: string) => {
    const response = await MakeUser(id);
    if (response.success) {
      window.location.reload();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div role="tablist" className="tabs tabs-lift mb-4">
        <a
          role="tab"
          className={`tab ${activeTab === "users" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <User className="h-4 w-4 mr-2" />
          Users
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "admins" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("admins")}
        >
          <Shield className="h-4 w-4 mr-2" />
          Admins
        </a>
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
          <div className="modal-box">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">
                Actions for {selectedUser.name}
              </h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
              >
                ✕
              </button>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-primary btn-sm">
                <Pencil className="h-4 w-4" />
              </button>
              {selectedUser.role === "user" ? (
                <button
                  onClick={() => makeAdmin(selectedUser.id)}
                  className="btn btn-success btn-sm"
                >
                  <Shield className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => makeUser(selectedUser.id)}
                  className="btn btn-success btn-sm"
                >
                  <User className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => deleteUser(selectedUser.id)}
                className="btn btn-error btn-sm"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
