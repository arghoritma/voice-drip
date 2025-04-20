import PostCard from "@/components/PostCard";
import { getRequests } from "@/actions/requests";
import { verifySession } from "@/lib/dal";
import CreatePost from "@/components/CreatePost";

export default async function Home() {
  const { data: requests, success } = await getRequests();
  const { isAuth } = await verifySession();

  return (
    <>
      {isAuth && <CreatePost />}
      <div className="space-y-4">
        {success &&
          requests?.map((request) => (
            <PostCard key={request.id} item={request} />
          ))}{" "}
      </div>{" "}
    </>
  );
}
