import PostCard from "@/components/PostCard";
import { getRequests } from "@/actions/requests";
import { verifySession } from "@/lib/dal";
import CreatePost from "@/components/CreatePost";

export default async function Home() {
  const { data: requests, success } = await getRequests();
  const isAuth = await verifySession();

  const featureRequests = requests?.filter((item) => item.type === "feature");

  return (
    <>
      {isAuth && <CreatePost />}
      <div className="space-y-4">
        {success &&
          featureRequests?.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
      </div>
    </>
  );
}