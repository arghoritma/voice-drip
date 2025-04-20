"use client";

import { Trash2 } from "lucide-react";
import { deleteRequest } from "@/actions/requests";
export default function DeletePost({ postId }: { postId: string }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const result = await deleteRequest(postId);
      if (result.success) {
        window.location.href = "/";
      }
    }
  };
  return (
    <button onClick={handleDelete} className="btn btn-error btn-sm btn-square">
      <Trash2 size={16} />
    </button>
  );
}
