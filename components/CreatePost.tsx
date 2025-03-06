"use client";

import React, { useState } from "react";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateRequestForm from "./forms/createPost";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <div className="flex gap-4">
            <MyAvatar />
            <input
              type="text"
              placeholder="Share your thoughts..."
              className="input input-bordered w-full"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              {" "}
              Add Post
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <dialog open className="modal backdrop-blur-sm">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Create Post</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <CreateRequestForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
