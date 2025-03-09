import PostCard from "@/components/PostCard";
import { getRequests } from "@/actions/requests";

export default async function Home() {
  const { data: requests, success } = await getRequests();

  const featureRequests = requests?.filter((item) => item.type === "feature");

  return (
    <>
      <div className="space-y-4">
        {success &&
          featureRequests?.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
      </div>
    </>
  );
}
