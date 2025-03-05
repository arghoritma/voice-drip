import { Heart, MessageCircle, Share2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";

export default function Home() {
  return (
    <>
      {/* Main Content */}

      {/* Create Post Card */}
      <CreatePost />
      {/* Feed Items */}
      <div className="space-y-4">
        {[
          {
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
          },
          {
            id: 2,
            user: {
              name: "Alice Smith",
              avatar: "https://ui-avatars.com/api/?name=Alice+Smith",
            },
            type: "bug",
            title: "Login Page Issue",
            description:
              "Users are experiencing intermittent login failures on the mobile app.",
            status: "open",
            likes: 15,
            comments: 23,
            created_at: "2024-01-25T13:15:00",
            tags: ["Mobile", "Critical"],
          },
        ].map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>

      {/* Right Sidebar */}
    </>
  );
}
