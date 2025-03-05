import ProfilNavbar from "./ProfilNavbar";
import NotifNavbar from "./NotifNavbar";
import { verifySession } from "@/lib/dal";

export default async function Navbar() {
  const { isAuth } = await verifySession();
  return (
    <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Driplab Issues</a>
      </div>
      <div className="flex-none">
        {isAuth ? (
          <>
            <a
              href="/add-issue"
              className="btn btn-primary btn-md rounded-md mr-3"
            >
              Add Issues
            </a>
            <NotifNavbar />
            <ProfilNavbar />
          </>
        ) : (
          <a href="/auth/login" className="btn btn-primary btn-md rounded-md">
            Add Issue
          </a>
        )}
      </div>
    </div>
  );
}
