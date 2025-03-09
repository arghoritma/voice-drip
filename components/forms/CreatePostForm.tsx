import React, { useEffect } from "react";
import { useActionState } from "react";
import { createRequest } from "@/actions/requests";
import { Platform, RequestResponse } from "@/types";

interface requestFormProps {
  onSuccess?: () => void | undefined;
  platforms: Platform[];
}

export default function CreateRequestForm({
  onSuccess,
  platforms,
}: requestFormProps) {
  const initialState: RequestResponse = { errors: {}, success: false };
  const [state, formAction, isPending] = useActionState(
    createRequest,
    initialState
  );

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction}>
      {state.errors?._form && (
        <div className="text-error">{state.errors._form.join(", ")}</div>
      )}

      <div className="form-control">
        <label htmlFor="platform" className="label">
          <span className="label-text">Platform</span>
        </label>
        <select
          id="platform"
          name="platform"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label htmlFor="type" className="label">
          <span className="label-text">Type</span>
        </label>
        <select
          id="type"
          name="type"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select type</option>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="improvement">Improvement</option>
        </select>
      </div>
      <div className="space-y-4">
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
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

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing...
            </>
          ) : (
            "Create Request"
          )}
        </button>
      </div>
    </form>
  );
}
