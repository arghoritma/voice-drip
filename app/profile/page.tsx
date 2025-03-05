import ProfileForm from "@/components/ProfileForm";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">
            Edit Profile
          </h2>

          <div className="flex flex-col lg:flex-row gap-6">
            <ProfilePhoto />
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
