"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeProps {
  item: number;
  islike: boolean;
  requestId: string;
}

export default function Like({ item, islike, requestId }: LikeProps) {
  const [likes, setLikes] = useState<number>(item || 0);
  const [isLiked, setIsLiked] = useState(islike);

  const handleLike = async () => {
    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        if (!isLiked) {
          setLikes(likes + 1);
        } else {
          setLikes(likes - 1);
        }
      }
    } catch (error) {
      console.error("Error liking request:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`btn btn-ghost btn-sm gap-2 ${isLiked ? "text-primary" : ""}`}
    >
      <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
      {likes > 0 && likes}
    </button>
  );
}
