import React from "react";
import { Camera } from "lucide-react";

export default function ProfilePhoto() {
  return (
    <div className="w-full lg:w-1/3 flex items-center align-middle justify-center">
      <div className="flex flex-col items-center bg-base-200 p-4 sm:p-8 rounded-xl">
        <div className="avatar">
          <div className="w-32 sm:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 hover:scale-105 transition-transform">
            <img src={"ssd"} alt="Profile" className="object-cover" />
          </div>
        </div>
        <label className="btn btn-primary mt-4 sm:mt-6 gap-2 hover:btn-secondary transition-colors text-sm sm:text-base w-full sm:w-auto">
          <Camera className="h-4 sm:h-5 w-4 sm:w-5" />

          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>
    </div>
  );
}
