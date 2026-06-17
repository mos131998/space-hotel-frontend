import AdminSidebar from "@/components/admin/AdminSidebar";
import { logout } from "@/lib/actions/auth.action";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <div className="flex justify-end border-b border-pink-900 p-4">
          <form action={logout}>
            <button
              type="submit"
              className="
                rounded-lg
                bg-red-600
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-500
              "
            >
              Logout
            </button>
          </form>
        </div>

        <main className="flex-1 p-8 text-white">{children}</main>
      </div>
    </div>
  );
}
