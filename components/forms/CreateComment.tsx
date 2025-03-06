"use client";

import React, { useState } from "react";

interface CreateCommentProps {
  requestId: string;
  onSuccess?: () => void;
}

export default function CreateComment({
  requestId,
  onSuccess,
}: CreateCommentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/comments", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        }
        (e.target as HTMLFormElement).reset();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
          rows={3}
          required
          disabled={isLoading}
        ></textarea>
        <input type="hidden" name="requestId" value={requestId} />
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}
