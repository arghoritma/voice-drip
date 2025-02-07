"use client";
import { useState } from "react";
import { Plus, Edit, Trash, Check, X } from "lucide-react";

export default function TodosPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn Next.js", completed: false },
    { id: 2, text: "Build a project", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Todo List</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Add new todo"
            className="input input-bordered w-full sm:flex-1"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="btn btn-primary w-full sm:w-auto" onClick={addTodo}>
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
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary mt-1 sm:mt-0"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                {editingId === todo.id ? (
                  <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
                    <input
                      type="text"
                      className="input input-bordered w-full sm:flex-1"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit(todo.id)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        className="btn btn-circle btn-sm btn-success"
                        onClick={() => saveEdit(todo.id)}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-circle btn-sm btn-error"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                    <span
                      className={`text-base sm:text-lg ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex gap-2 justify-end">
                      <button
                        className="btn btn-circle btn-sm btn-info"
                        onClick={() => startEdit(todo.id, todo.text)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-circle btn-sm btn-error"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
