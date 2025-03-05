import { Heart, MessageCircle, Share2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import PostCard from "@/components/PostCard";

export default function PostDetail() {
  // Dummy post data
  const post = {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
    },
    type: "feature",
    title: "Dark Mode Implementation",
    description:
      "We're working on implementing a system-wide dark mode for better night viewing experience.",
    status: "in_progress",
    likes: 42,
    comments: 8,
    created_at: "2024-01-25T14:30:00",
    tags: ["UI/UX", "Enhancement"],
    likedBy: [
      {
        name: "Sarah Wilson",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson",
      },
      {
        name: "Mike Brown",
        avatar: "https://ui-avatars.com/api/?name=Mike+Brown",
      },
      {
        name: "Emma Davis",
        avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      },
    ],
  };

  // Dummy comments data
  const comments = [
    {
      id: 1,
      user: {
        name: "Alice Smith",
        avatar: "https://ui-avatars.com/api/?name=Alice+Smith",
      },
      content: "This is a great feature! Can't wait to see it implemented.",
      created_at: "2024-01-26T10:00:00",
    },
    {
      id: 2,
      user: {
        name: "Bob Johnson",
        avatar: "https://ui-avatars.com/api/?name=Bob+Johnson",
      },
      content: "Will this be available on mobile devices as well?",
      created_at: "2024-01-26T11:30:00",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex gap-4 mb-6">
            <Avatar src={post.user.avatar} className="h-16 w-16" />
            <div className="flex-1">
              <h4 className="font-bold text-xl">{post.user.name}</h4>
              <span className="text-sm text-base-content/70">
                {new Date(post.created_at).toLocaleString()}
              </span>
              <p className="mt-2 text-lg">{post.description}</p>
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge badge-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  {post.likedBy.map((user, index) => (
                    <Avatar
                      key={index}
                      src={user.avatar}
                      className="h-6 w-6 border-2 border-base-100 rounded-full"
                      />
                  ))}
                </div>
                <span className="text-sm text-base-content/70">
                  {post.likes} likes
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <h3 className="text-xl font-bold mb-4">
            Comments ({comments.length})
          </h3>

          {/* Add Comment */}
          <div className="flex gap-4 mb-6">
            <Avatar
              src="https://ui-avatars.com/api/?name=Current+User"
              className="h-8 w-8"
            />
            <div className="flex-1">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Add a comment..."
                rows={3}
              ></textarea>
              <button className="btn btn-primary mt-2">Post Comment</button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar src={comment.user.avatar} className="h-8 w-8" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{comment.user.name}</h4>
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
