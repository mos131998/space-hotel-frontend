import AdminSidebar from "@/components/admin/AdminSidebar";
import React, { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 text-white">{children}</main>
    </div>
  );
}
