"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeProps {
  item: number;
  islike: boolean;
}

export default function Like({ item, islike }: LikeProps) {
  const [likes, setLikes] = useState<number>(item || 0);
  const [isLiked, setIsLiked] = useState(islike);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
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
