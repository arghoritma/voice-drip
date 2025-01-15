"use client";

import React, { useState, useEffect } from "react";
import Categories from "@/components/Categories";

interface Category {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  async function getCategories(): Promise<Category[]> {
    const res = await fetch("/api/todos/categories/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 404) {
      return [];
    }

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  }

  async function createCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/todos/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, color }),
      });

      if (!res.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory: Category = await res.json();
      setCategories([...categories, newCategory]);
      setOpen(false);
      setName("");
      setColor("#000000");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Categories</h1>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setOpen(true)}
          >
            Add Category
          </button>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Category</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={createCategory} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full border rounded px-3 py-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="color" className="block mb-2">
                      Color
                    </label>
                    <input
                      id="color"
                      type="color"
                      className="w-full h-10 border rounded px-3"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
                  >
                    Create Category
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Categories categories={categories} />
      </div>
    </div>
  );
}
