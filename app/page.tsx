import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import { getRequests } from "@/actions/requests";
import { verifySession } from "@/lib/dal";

export default async function Home() {
  const { data: requests, success } = await getRequests();
  const { isAuth } = await verifySession();

  console.log(requests);

  return (
    <>
      {isAuth && <CreatePost />}
      <div className="space-y-4">
        {success &&
          requests?.map((item) => <PostCard key={item.id} item={item} />)}
      </div>
    </>
  );
}
