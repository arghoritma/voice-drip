/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import {
  getPlatforms,
  deletePlatform,
  createPlatform,
} from "@/actions/platforms";
import { Platform } from "@/types";

export default function Page() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const action = await getPlatforms();
      if (action.success) {
        setPlatforms(action.data);
      }
    };
    fetchPlatforms();
  }, []);

  useEffect(() => {
    if (formSuccess) {
      setIsModalOpen(false);
      setFormSuccess(false);
      window.location.reload();
    }
  }, [formSuccess]);

  const handleSubmit = async (formData: FormData) => {
    const result = await createPlatform(formData);
    if (result.success) {
      setFormSuccess(true);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Platforms</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add Platform
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.isArray(platforms) &&
          platforms.map((platform) => (
            <div
              key={platform.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  {platform.logo && (
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-xl">
                        <img
                          src={platform.logo}
                          alt={platform.name}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <h2 className="card-title text-xl">{platform.name}</h2>
                </div>
                <p className="text-base-content/70 mt-4">
                  {platform.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  <a
                    href={`/admin/platforms/${platform.id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </a>
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Are you sure you want to delete this platform?"
                        )
                      ) {
                        await deletePlatform(platform.id);
                        window.location.reload();
                      }
                    }}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <dialog open className="modal backdrop-blur-xs">
          <div className="modal-box">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Add New Platform</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form action={handleSubmit} onSubmit={() => setFormSuccess(true)}>
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Platform Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="description" className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="logo" className="label">
                  <span className="label-text">Logo URL</span>
                </label>
                <input
                  type="text"
                  id="logo"
                  name="logo"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Create Platform
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
