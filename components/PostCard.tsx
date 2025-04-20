/* eslint-disable @next/next/no-img-element */
"use client";

import Avatar from "@/components/ui/Avatar";
import { MessageCircle, Bug, Rocket, Sparkles, X } from "lucide-react";
import { PostCardProps } from "@/types";
import Like from "./forms/Like";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);

export default function PostCard({ item }: PostCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      className="card bg-base-100  hover:shadow-2xl transition-shadow duration-300 mt-2"
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
        <div className="">
          <h2 className="card-title text-xl mb-2">{item.title}</h2>
          <p className="text-sm text-base-content/80 leading-relaxed">
            {item.description}
          </p>
          {item.images && item.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Request image ${index + 1}`}
                  className="w-20 h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2 items-center pt-3 border-t">
          <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-1">
              <img
                src={item.platform_logo}
                alt={item.platform_name}
                width={16}
                height={16}
                className="rounded-sm"
              />
              <span className="text-xs text-base-content/70">
                {item.platform_name}
              </span>
            </div>
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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              className="absolute top-0 right-0 p-2 text-white bg-black bg-opacity-50 rounded-full m-2 hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Selected image"
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
