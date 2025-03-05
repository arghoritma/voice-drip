import React from "react";
import MyAvatar from "@/components/ui/MyAvatar";

export default function CreatePost() {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <div className="flex gap-4">
          <MyAvatar />
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-primary"> Add Post</button>
        </div>
      </div>
    </div>
  );
}
