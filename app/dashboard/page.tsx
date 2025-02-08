"use client";

import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  created_at: string;
  completed_at?: string;
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalTodos, setTotalTodos] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [pendingTodos, setPendingTodos] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
      setTotalTodos(data.length);
      setCompletedTodos(
        data.filter((todo: Todo) => todo.status === "completed").length
      );
      setPendingTodos(
        data.filter((todo: Todo) => todo.status === "pending").length
      );
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const newTodo = {
        title: "New Todo",
        description: "Todo Description",
        date: new Date().toISOString().split("T")[0],
      };

      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleCompleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos?id=${id}`, {
        method: "PATCH",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Todo Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Todo List</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Todos</div>
                <div className="stat-value">{totalTodos}</div>
                <div className="stat-desc">{completedTodos} completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pending</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Pending Todos</div>
                <div className="stat-value">{pendingTodos}</div>
                <div className="stat-desc">Pending todos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Summary Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Completed</h2>
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Completed Todos</div>
                <div className="stat-value">{completedTodos}</div>
                <div className="stat-desc">Finished todos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Recent Activities</h2>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-2 sm:p-6">
            <div className="overflow-x-auto">
              <table className="table table-sm sm:table-md">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo.id}>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            todo.status === "completed"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {todo.status}
                        </span>
                      </td>
                      <td>
                        {todo.status === "pending" && (
                          <button
                            onClick={() => handleCompleteTodo(todo.id)}
                            className="btn btn-sm btn-success"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
