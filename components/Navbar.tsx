import ProfilNavbar from "./ProfilNavbar";
import NotifNavbar from "./NotifNavbar";
import { verifySession } from "@/lib/dal";

export default async function Navbar() {
  const { isAuth } = await verifySession();
  return (
    <div className="navbar bg-base-100 text-base-content sticky top-0 z-50 glass ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Voice Drip</a>
      </div>
      <div className="flex-none">
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
              Add Issue
            </label>
          </>
        )}
      </div>
    </div>
  );
}
