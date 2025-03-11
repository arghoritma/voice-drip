import Avatar from "@/components/ui/Avatar";
import { getRequestWithDetails } from "@/actions/requests";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateComment from "@/components/forms/CreateComment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Bug, Rocket, Sparkles } from "lucide-react";
import { verifySession } from "@/lib/dal";

dayjs.extend(relativeTime);

export default async function PostDetail({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const postId = (await params).post;
  const response = await getRequestWithDetails(postId);
  const { isAuth } = await verifySession();

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
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body p-4">
          <div className="flex flex-row justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <Avatar
                src={post.user?.avatar}
                className="h-8 w-8 rounded-full ring-1 ring-base-200"
              />
              <div>
                <h3 className="font-bold text-base">{post.user?.name}</h3>
                <p className="text-xs text-base-content/70">
                  {dayjs(post.created_at).fromNow()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span
                className={`text-xs ${getStatusColor(post.status)} uppercase`}
              >
                {post.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="card-title text-xl mb-2">{post.title}</h2>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {post.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags?.map((tag) => (
              <div key={tag} className="badge badge-outline badge-lg">
                {tag}
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-2 items-center mt-3 pt-3 border-t">
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

          <div className="divider my-4"></div>

          {/* Add Comment */}
          {isAuth && (
            <div className="flex gap-4 mb-6">
              <MyAvatar />
              <CreateComment requestId={postId} />
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar
                  src={comment.user_avatar}
                  className="h-8 w-8 rounded-full ring-1 ring-base-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">{comment.user_name}</h4>
                    <p className="text-xs text-base-content/70">
                      {dayjs(comment.created_at).fromNow()}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-base-content/80">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
