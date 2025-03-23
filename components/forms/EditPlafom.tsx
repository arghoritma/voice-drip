"use client";

import React from "react";
import { Platform } from "@/types";
import { updatePlatform } from "@/actions/platforms";
import { useFormState } from "react-dom";

export default function EditPlafom({ platform }: { platform: Platform }) {
  const [state, formAction] = useFormState(updatePlatform, {
    success: false,
    error: "",
  });

  return (
    <>
      {state?.error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}
      {state?.success && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Platform updated successfully!</span>
        </div>
      )}
      <form action={formAction} className="py-4">
        <input type="hidden" name="id" value={platform?.id} />
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={platform?.name}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={platform?.description}
              className="textarea textarea-bordered w-full"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Logo URL</span>
            </label>
            <input
              type="text"
              name="logo"
              defaultValue={platform?.logo}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update Platform
          </button>
        </div>
      </form>
    </>
  );
}
