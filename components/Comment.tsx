import React from "react";
import Avatar from "./ui/Avatar";
import dayjs from "dayjs";
import { CommentWithUser } from "@/types";

export default function Comment(props: { comment: CommentWithUser }) {
  const comment = props.comment;
  return (
    <div key={comment.id} className="flex gap-4">
      <div className="flex justify-start items-start pt-2">
        <Avatar src={comment.user_avatar} w={8} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm">{comment.user_name}</h4>
          <p className="text-xs text-base-content/70">
            {dayjs(comment.created_at).fromNow()}
          </p>
        </div>
        <p className="mt-1 text-sm text-base-content/80">{comment.content}</p>
      </div>
    </div>
  );
}
