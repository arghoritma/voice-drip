import React from "react";
import { GetIsAdmin } from "@/actions/profile";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await GetIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
