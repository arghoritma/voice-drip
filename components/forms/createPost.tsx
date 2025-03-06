import React from "react";
import { useActionState } from "react";
import { createRequest } from "@/actions/requests";

export default function CreateRequestForm() {
  const initialState = { errors: {}, success: false };
  const [state, formAction, isPending] = useActionState(
    createRequest,
    initialState
  );

  return (
    <form action={formAction}>
      {state.errors?._form && (
        <div className="text-error">{state.errors._form.join(", ")}</div>
      )}

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
          {state.errors?.title && (
            <div className="text-error">{state.errors.title.join(", ")}</div>
          )}
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
          {state.errors?.description && (
            <div className="text-error">
              {state.errors.description.join(", ")}
            </div>
          )}
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
          {state.errors?.type && (
            <div className="text-error">{state.errors.type.join(", ")}</div>
          )}
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
