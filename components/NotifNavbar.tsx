import { Bell } from "lucide-react";

export default function NotifNavbar() {
  return (
    <div className="dropdown dropdown-end mr-3">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator ">
          <Bell className="h-5 w-5" />
          <span className="badge badge-sm indicator-item">3</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow rounded-xl"
      >
        <div className="card-body bg-neutral text-neutral-content rounded-xl">
          <span className="text-lg font-bold">Notifications</span>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">New message from John</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Your task was completed</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Meeting reminder</p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
            </div>
          </div>
          <div className="card-actions mt-2">
            <button className="btn btn-primary btn-block btn-sm rounded-lg">
              View all notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
