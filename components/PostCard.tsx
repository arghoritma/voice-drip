import Avatar from "@/components/ui/Avatar";
import { MessageCircle, Bug, Rocket, Sparkles } from "lucide-react";
import { PostCardProps } from "@/types";
import Like from "./forms/Like";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function PostCard({ item }: PostCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "text-warning";
      case "approved":
        return "text-info";
      case "rejected":
        return "text-error";
      case "in_progress":
        return "text-primary";
      case "completed":
        return "text-success";
      default:
        return "text-neutral";
    }
  };

  return (
    <div
      key={item.id}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="card-body p-4">
        <div className="flex flex-row justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <Avatar src={item.user.avatar} />
            <div>
              <h3 className="font-bold text-base">{item.user.name}</h3>
              <p className="text-xs text-base-content/70">
                {dayjs(item.created_at).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <span
              className={`text-xs ${getStatusColor(item.status)} uppercase`}
            >
              {item.status.replace("_", " ")}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="card-title text-xl mb-2">{item.title}</h2>
          <p className="text-sm text-base-content/80 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {/* {item.tags.map((tag: string, index: number) => (
            <div key={index} className="badge badge-outline badge-lg">
              {tag}
            </div>
          ))} */}
        </div>
        <div className="flex justify-between gap-2 items-center mt-3 pt-3 border-t">
          <div className="flex items-center gap-1 text-xs uppercase">
            {item.type === "bug" ? (
              <Bug size={12} className="text-error" />
            ) : item.type === "feature" ? (
              <Sparkles size={12} className="text-primary" />
            ) : item.type === "improvement" ? (
              <Rocket size={12} className="text-success" />
            ) : null}
            <span
              className={`
              ${item.type === "bug" ? "text-error" : ""}
              ${item.type === "feature" ? "text-primary" : ""}
              ${item.type === "improvement" ? "text-success" : ""}
              ${
                !["bug", "feature", "improvement"].includes(item.type)
                  ? "text-neutral"
                  : ""
              }
            `}
            >
              {item.type}
            </span>
          </div>
          <div className="flex gap-1">
            <Like item={item.likes} islike={item.isVoted} requestId={item.id} />
            <Link
              href={`/posts/${item.id}`}
              className="btn btn-ghost btn-sm gap-1 hover:bg-base-200"
            >
              <MessageCircle
                fill={item.comments > 0 ? "currentColor" : "none"}
                size={16}
              />
              {item.comments > 0 && (
                <span className="font-medium text-sm">{item.comments}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
