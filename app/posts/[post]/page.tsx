import { Heart, MessageCircle, Share2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { getRequestWithDetails } from "@/actions/requests";
import MyAvatar from "@/components/ui/MyAvatar";
import CreateComment from "@/components/forms/CreateComment";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const postId = (await params).post;
  const response = await getRequestWithDetails(postId);

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

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-4 mb-6">
            <Avatar src={post.user?.avatar || ""} className="h-16 w-16" />
            <div className="flex-1">
              <h4 className="font-bold text-xl">{post.user?.name}</h4>
              <span className="text-sm text-base-content/70">
                {new Date(post.created_at).toLocaleString()}
              </span>
              <p className="mt-2 text-lg">{post.description}</p>
              <div className="flex gap-2 mt-2">
                {post.tags?.map((tag) => (
                  <span key={tag} className="badge badge-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-base-content/70">
                  {post.vote_count} likes
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <h3 className="text-xl font-bold mb-4">
            Comments ({post.comments?.length || 0})
          </h3>

          {/* Add Comment */}
          <div className="flex gap-4 mb-6">
            <MyAvatar />
            <CreateComment requestId={postId} />
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar src={comment.user_avatar} className="h-8 w-8" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{comment.user_name}</h4>
                    <span className="text-sm text-base-content/70">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
