import {
  LayoutDashboard,
  FileBox,
  Calendar,
  CalendarDays,
  CalendarCheck2,
} from "lucide-react";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    subItems: [
      { label: "Overview", path: "/dashboard/" },
      { label: "Analytics", path: "/dashboard/analytics" },
    ],
  },
  {
    key: "files",
    label: "Files",
    icon: FileBox,
    path: "/dashboard/files",
    subItems: [
      { label: "Task Files", path: "/dashboard/files/tasks" },
      { label: "Uploaded Files", path: "/dashboard/files/uploaded" },
    ],
  },
  {
    key: "calendar",
    label: "Calendar View",
    icon: Calendar,
    path: "/dashboard/calendar",
    subItems: [
      {
        label: "Day View",
        icon: CalendarDays,
        path: "/dashboard/calendar/day",
        subSubItems: [
          { label: "Today", path: "/dashboard/calendar/day/today" },
          { label: "Tomorrow", path: "/dashboard/calendar/day/tomorrow" },
        ],
      },
      {
        label: "Week View",
        icon: Calendar,
        path: "/dashboard/calendar/week",
        subSubItems: [
          { label: "This Week", path: "/dashboard/calendar/week/this-week" },
          { label: "Next Week", path: "/dashboard/calendar/week/next-week" },
        ],
      },
      {
        label: "Month View",
        icon: CalendarCheck2,
        path: "/dashboard/calendar/month",
        subSubItems: [
          { label: "This Month", path: "/dashboard/calendar/month/this-month" },
          { label: "Next Month", path: "/dashboard/calendar/month/next-month" },
        ],
      },
    ],
  },
];

export default menuItems;
