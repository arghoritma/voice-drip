import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-base-100">
          <div className="p-4 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-primary">
              Edit Profile
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">
              <div className="w-full lg:w-1/3">
                <div className="flex flex-col items-center bg-base-200 p-4 sm:p-8 rounded-xl">
                  <div className="avatar">
                    <div className="w-32 sm:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 hover:scale-105 transition-transform">
                      <img src={"ssd"} alt="Profile" className="object-cover" />
                    </div>
                  </div>
                  <label className="btn btn-primary mt-4 sm:mt-6 gap-2 hover:btn-secondary transition-colors text-sm sm:text-base w-full sm:w-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 sm:h-5 w-4 sm:w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Change Photo
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
