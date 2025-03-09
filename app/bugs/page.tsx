import PostCard from "@/components/PostCard";
import { getRequests } from "@/actions/requests";

export default async function Home() {
  const { data: requests, success } = await getRequests();

  const bugsRequests = requests?.filter((item) => item.type === "bug");

  return (
    <>
      <div className="space-y-4">
        {success &&
          bugsRequests?.map((item) => <PostCard key={item.id} item={item} />)}
      </div>
    </>
  );
}
