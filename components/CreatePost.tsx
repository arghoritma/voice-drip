"use client";

import React, { useState, useEffect } from "react";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateRequestForm from "@/components/forms/CreatePostForm";
import { getPlatforms } from "@/actions/platforms";
import { Platform } from "@/types";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    if (formSuccess) {
      // Tutup modal
      setIsModalOpen(false);
      // Reset state
      setFormSuccess(false);

      window.location.reload();
    }
  }, [formSuccess]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const platforms = await getPlatforms();
        setPlatforms(platforms as Platform[]);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  return (
    <>
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <div className="flex gap-4">
            <MyAvatar />
            <input
              type="text"
              placeholder="Bagikan permintaan fitur, (bug report), atau (improvement) yang anda inginkan..."
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
              <h3 className="font-bold text-lg">Create Post Request</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <CreateRequestForm
              onSuccess={() => setFormSuccess(true)}
              platforms={platforms}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
