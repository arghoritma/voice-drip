import Avatar from "./ui/Avatar";
import ProfileInfo from "./ProfileInfo";
import LogoutButton from "./ui/LogoutButton";
import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function ProfilNavbar() {
  return (
    <div className="dropdown dropdown-end ">
      <Avatar />
      <ul
        tabIndex={0}
        className="bg-neutral text-neutral-content menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <div className="px-4 py-3">
          <ProfileInfo />
        </div>
        <div className="border-t border-gray-200 my-2"></div>
        <li>
          <Link
            href="/dashboard/profile"
            className="flex justify-between w-full"
          >
            <span>Profile</span>
            <UserCircle size={16} />
          </Link>
        </li>

        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
