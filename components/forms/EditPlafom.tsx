import React from "react";
import { Platform } from "@/types";
import { updatePlatform } from "@/actions/platforms";

interface EditPlafomProps {
  platform: Platform;
  platformId: string;
}

export default function EditPlafom({ platform }: { platform: Platform }) {
  return (
    <form action={updatePlatform} className="py-4">
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
  );
}
