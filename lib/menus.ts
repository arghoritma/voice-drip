import {
  LayoutDashboard,
  FileBox,
  Calendar,
  CalendarCheck2,
  ListTodoIcon,
} from "lucide-react";
import path from "path";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    key: "todos",
    label: "Todos",
    icon: ListTodoIcon,
    path: "/dashboard/todos",
  },
  {
    key: "tasks",
    label: "Tasks",
    icon: CalendarCheck2,
    path: "/dashboard/tasks",
  },
  {
    key: "files",
    label: "Files",
    icon: FileBox,
    path: "/dashboard/files",
  },
];

export default menuItems;
