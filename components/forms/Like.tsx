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
      // Update UI immediately
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);

      // Then make API call
      if (!isLiked) {
        await fetch("/api/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId }),
        });
      } else {
        await fetch("/api/unlike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId }),
        });
      }
    } catch (error) {
      // Revert UI changes if API call fails
      setIsLiked(isLiked);
      setLikes(likes);
      console.error("Error handling like/unlike:", error);
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
