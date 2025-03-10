import Avatar from "@/components/ui/Avatar";
import { MessageCircle, Share2 } from "lucide-react";
import { PostCardProps } from "@/types";
import Like from "./forms/Like";
import Link from "next/link";

export default function PostCard({ item }: PostCardProps) {
  return (
    <div key={item.id} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex gap-3">
            <Avatar src={item.user.avatar} className="h-10 w-10" />
            <div>
              <h3 className="font-bold">{item.user.name}</h3>
              <p className="text-sm text-base-content/70">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className={`badge ${
              item.type === "bug"
                ? "badge-error"
                : item.type === "feature"
                ? "badge-primary"
                : item.type === "improvement"
                ? "badge-success"
                : "badge-neutral"
            }`}
          >
            {item.type}
          </div>
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
        <div className="flex justify-end gap-2 items-center mt-4 pt-4 border-t">
          <Like item={item.likes} islike={item.isVoted} requestId={item.id} />
          <Link
            href={`/posts/${item.id}`}
            className="btn btn-ghost btn-sm gap-2"
          >
            <MessageCircle
              fill={item.comments > 0 ? "currentColor" : "none"}
              size={18}
            />{" "}
            {item.comments > 0 && item.comments}
          </Link>
          <button className="btn btn-ghost btn-sm">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
