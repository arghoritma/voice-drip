/* eslint-disable @next/next/no-img-element */
import Avatar from "@/components/ui/Avatar";
import { getRequestWithDetails } from "@/actions/requests";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateComment from "@/components/forms/CreateComment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bug, Rocket, Sparkles } from "lucide-react";
import { verifySession } from "@/lib/dal";
import Comment from "@/components/Comment";
import { GetIsAdmin } from "@/actions/profile";
import DeletePost from "@/components/DeletePost";

dayjs.extend(relativeTime);

export default async function PostDetail({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const postId = (await params).post;
  const response = await getRequestWithDetails(postId);
  const { isAuth } = await verifySession();
  const { isAdmin } = await GetIsAdmin();

  if (!response.success || !response.data) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="alert alert-error">
          {response.errors?._form?.[0] || "Failed to load post"}
        </div>
      </div>
    );
  }

  const post = response.data;

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card bg-base-100  hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body p-4">
          <div className="flex flex-row justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <Avatar src={post.user?.avatar} />
              <div>
                <h3 className="font-bold text-base">{post.user?.name}</h3>
                <p className="text-xs text-base-content/70">
                  {dayjs(post.created_at).fromNow()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span
                className={`text-xs ${getStatusColor(post.status)} uppercase`}
              >
                {post.status.replace("_", " ")}
              </span>
              {isAdmin && <DeletePost postId={postId} />}
            </div>
          </div>

          <div className="mt-3">
            <h2 className="card-title text-xl mb-2">{post.title}</h2>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {post.description}
            </p>
            {post.images && post.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.images.map((image: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Request image ${index + 1}`}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between gap-2 items-center  pt-3 border-t">
            <div className="flex items-center gap-1 text-xs uppercase">
              {post.type === "bug" ? (
                <Bug size={12} className="text-error" />
              ) : post.type === "feature" ? (
                <Sparkles size={12} className="text-primary" />
              ) : post.type === "improvement" ? (
                <Rocket size={12} className="text-success" />
              ) : null}
              <span
                className={`
                  ${post.type === "bug" ? "text-error" : ""}
                  ${post.type === "feature" ? "text-primary" : ""}
                  ${post.type === "improvement" ? "text-success" : ""}
                  ${
                    !["bug", "feature", "improvement"].includes(post.type)
                      ? "text-neutral"
                      : ""
                  }
                `}
              >
                {post.type}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-base-content/70">
                {post.vote_count} likes
              </span>
              <span className="text-xs text-base-content/70">•</span>
              <span className="text-xs text-base-content/70">
                {post.comments?.length || 0} comments
              </span>
            </div>
          </div>

          {/* Add Comment */}
          {isAuth && (
            <div className="flex gap-4 my-6">
              <MyAvatar />
              <CreateComment requestId={postId} />
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments
              ?.sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((comment) => (
                <div key={comment.id}>
                  <Comment comment={comment} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
