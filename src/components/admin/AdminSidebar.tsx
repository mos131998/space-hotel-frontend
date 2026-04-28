import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
  return (
    <div className="w-56 min-h-screen bg-[#2a0a1f] border-r border-pink-800 flex flex-col p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">dashboard</h2>
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/admin" className="text-white hover:text-pink-400 p-2">
          Dashboard
        </Link>
        <Link
          href="/admin/bookings"
          className="text-white hover:text-pink-400 p-2"
        >
          Bookings
        </Link>
      </nav>
    </div>
  );
}
