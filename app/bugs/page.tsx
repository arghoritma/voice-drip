import PostCard from "@/components/PostCard";
import { getRequests } from "@/actions/requests";
import { verifySession } from "@/lib/dal";
import CreatePost from "@/components/CreatePost";

export default async function Home() {
  const { data: requests, success } = await getRequests();
  const { isAuth } = await verifySession();

  const bugsRequests = requests?.filter((item) => item.type === "bug");

  return (
    <>
      {isAuth && <CreatePost />}
      <div className="space-y-4">
        {success &&
          bugsRequests?.map((item) => <PostCard key={item.id} item={item} />)}
      </div>
    </>
  );
}
