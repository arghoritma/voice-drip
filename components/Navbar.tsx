import ProfilNavbar from "./ProfilNavbar";
import { verifySession } from "@/lib/dal";
import Image from "next/image";
import DarkModeButton from "./DarkModeButton";
import { LogIn } from "lucide-react";

export default async function Navbar() {
  const { isAuth } = await verifySession();

  return (
    <div className="navbar bg-base-100 text-base-content sticky top-0 z-50 glass ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <Image
            src="/logo.png"
            alt="Voice Drip Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          Voice Drip
        </a>
      </div>
      <div className="flex-none">
        <DarkModeButton />
        {isAuth ? (
          <>
            {/* <NotifNavbar /> */}
            <ProfilNavbar />
          </>
        ) : (
          <>
            <label
              htmlFor="auth_modal"
              className="btn btn-primary btn-md rounded-md"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </label>
          </>
        )}
      </div>
    </div>
  );
}
