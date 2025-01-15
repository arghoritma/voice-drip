"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ListTodo,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  Users,
  Bell,
} from "lucide-react";

import menuItems from "@/lib/menus";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"dashboard" | "files" | "calendar">(
    "dashboard"
  );
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (pathname.startsWith(item.path)) {
        setView(item.key as any);
        setOpenDropdowns((prev) => ({ ...prev, [item.key]: true }));

        item.subItems.forEach((subItem, index) => {
          if ("path" in subItem && pathname.startsWith(subItem.path)) {
            setOpenDropdowns((prev) => ({
              ...prev,
              [`${item.key}-${index}`]: true,
            }));
          }
        });
      }
    });
  }, [pathname]);

  const handleLogout = () => {
    console.log("logout");
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const NavButton = ({
    icon: Icon,
    label,
    children,
    dropdownKey,
    path,
  }: any) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const isActive =
      pathSegments.length <= 2
        ? pathname.startsWith(path)
        : path !== "/dashboard" && pathname.startsWith(path);

    return (
      <div className="w-full">
        <div className="w-full">
          {children ? (
            <button
              onClick={() => toggleDropdown(dropdownKey)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-foreground text-background"
                  : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{label}</span>
              </div>
              {openDropdowns[dropdownKey] ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          ) : (
            <Link
              href={path}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-foreground text-background"
                  : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          )}
        </div>
        {children && openDropdowns[dropdownKey] && (
          <div className="ml-6 mt-1 space-y-1">{children}</div>
        )}
      </div>
    );
  };

  const SubNavButton = ({
    label,
    icon: Icon,
    children,
    dropdownKey,
    path,
  }: any) => (
    <div className="w-full">
      <div className="w-full">
        {children ? (
          <button
            onClick={() => toggleDropdown(dropdownKey)}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === path
                ? "bg-foreground text-background"
                : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            }`}
          >
            <div className="flex items-center">
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span className="font-medium">{label}</span>
            </div>
            {openDropdowns[dropdownKey] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        ) : (
          <Link
            href={path}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
              pathname === path
                ? "bg-foreground text-background"
                : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
            }`}
          >
            <div className="flex items-center">
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span className="font-medium">{label}</span>
            </div>
          </Link>
        )}
      </div>
      {children && openDropdowns[dropdownKey] && (
        <div className="ml-6 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );

  const SubSubNavButton = ({ label, path }: any) => {
    const router = useRouter();
    return (
      <div
        onClick={() => router.push(path)}
        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
          pathname === path
            ? "bg-foreground text-background"
            : "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
        }`}
      >
        <span className="font-medium">{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex font-[family-name:var(--font-geist-sans)]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-background border-r border-black/[.08] dark:border-white/[.145] w-64 md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-black/[.08] dark:border-white/[.145]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-foreground text-background rounded-xl">
                <ListTodo className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold">DripTasker</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavButton
                key={item.key}
                icon={item.icon}
                label={item.label}
                dropdownKey={item.key}
                path={item.path}
              >
                {item.subItems.map((subItem, index) => (
                  <SubNavButton
                    key={index}
                    icon={"icon" in subItem ? subItem.icon : undefined}
                    label={subItem.label}
                    dropdownKey={`${item.key}-${index}`}
                    path={subItem.path}
                  >
                    {"subSubItems" in subItem &&
                      subItem.subSubItems?.map((subSubItem, subIndex) => (
                        <SubSubNavButton
                          key={subIndex}
                          label={subSubItem.label}
                          path={subSubItem.path}
                        />
                      ))}
                  </SubNavButton>
                ))}
              </NavButton>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div
            className="p-4 border-t border-black/[.08] dark:border-white/[.145] space-y-2"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="flex items-center space-x-3 px-4 py-3">
              <div className="relative group flex items-center space-x-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s"
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm opacity-70">john@example.com</p>
                </div>
                {showProfileDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-background rounded-lg shadow-lg border border-black/[.08] dark:border-white/[.145]">
                    <div className="py-1">
                      <button
                        onClick={() => router.push("/profile")}
                        className="flex items-center w-full px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => setShowCategoryManager(true)}
                        className="flex items-center w-full px-4 py-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings</span>
                      </button>
                      <hr className="my-1 border-black/[.08] dark:border-white/[.145]" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 right-4 md:hidden z-50 p-3 bg-foreground text-background rounded-full shadow-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Main Content */}
      <div className="flex-1 md:pl-64">
        {/* Top Navbar */}
        <nav className="bg-background border-b border-black/[.08] dark:border-white/[.145] px-4 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {menuItems.find((item) => item.key === view)?.label ||
                "Dashboard"}
            </h1>
            <button
              onClick={() => router.push("/dashboard/notifications")}
              className="p-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] rounded-full relative"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </nav>
        <div className="p-4 md:p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
