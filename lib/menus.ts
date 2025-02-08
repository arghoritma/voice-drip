import {
  LayoutDashboard,
  FileBox,
  ListTodoIcon,
} from "lucide-react";

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

];

export default menuItems;
