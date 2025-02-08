"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Check, X } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  created_at: string;
  user_id: string;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (newTodo.title.trim()) {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([data, ...todos]);
      setNewTodo({ title: "", description: "", date: "" });
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
          Todo List
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Todo title"
            className="input input-bordered w-full sm:flex-1"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-full sm:flex-1"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full sm:flex-1"
            value={newTodo.date}
            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
          />
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={addTodo}
          >
            <Plus className="w-5 h-5" />
            <span className="ml-2">Add Todo</span>
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="card-body p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-semibold">
                      {todo.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {todo.description}
                    </span>
                    <span className="text-xs text-gray-500">
                      Due: {new Date(todo.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      className="btn btn-circle btn-sm btn-error"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
