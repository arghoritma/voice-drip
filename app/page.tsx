import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { getRequests } from "@/actions/requests";

export default async function Home() {
  const { data: requests, success } = await getRequests();

  return (
    <>
      <CreatePost />
      <div className="space-y-4">
        {success &&
          requests?.map((item) => <PostCard key={item.id} item={item} />)}
      </div>
    </>
  );
}
