import EditPlafom from "@/components/forms/EditPlafom";
import { getPlatform } from "@/actions/platforms";

export default async function Page({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const platformId = (await params).platform;
  const { data: platform } = await getPlatform(platformId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Platform</h1>
      <EditPlafom platform={platform} />
    </div>
  );
}
