import React from "react";
import Avatar from "@/components/ui/Avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostCardProps {
  item: {
    id: string;
    user: {
      name: string;
    };
    created_at: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
    likes: number;
    comments: number;
  };
}

export default function PostCard({ item }: PostCardProps) {
  <div key={item.id} className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex gap-3">
          <Avatar />
          <div>
            <h3 className="font-bold">{item.user.name}</h3>
            <p className="text-sm text-base-content/70">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="badge badge-primary">{item.type}</div>
      </div>

      <h2 className="card-title mt-4">{item.title}</h2>
      <p>{item.description}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {item.tags.map((tag: string, index: number) => (
          <div key={index} className="badge badge-outline">
            {tag}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <button className="btn btn-ghost btn-sm gap-2">
          <Heart size={18} /> {item.likes}
        </button>
        <button className="btn btn-ghost btn-sm gap-2">
          <MessageCircle size={18} /> {item.comments}
        </button>
        <button className="btn btn-ghost btn-sm">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  </div>;
}
