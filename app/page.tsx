import { Heart, MessageCircle, Share2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="col-span-1 md:col-span-6">
        {/* Create Post Card */}
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body">
            <div className="flex gap-4">
              <Avatar />
              <input
                type="text"
                placeholder="Share your thoughts..."
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-primary"> Add Post</button>
            </div>
          </div>
        </div>

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
                  {item.tags.map((tag, index) => (
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
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
    </>
  );
}
