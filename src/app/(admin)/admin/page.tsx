import { roomService } from "@/lib/api/room/room.service";
import { bookingService } from "@/lib/api/booking/booking.service";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminPage() {
  const user = await getCurrentUser();
  const rooms = await roomService.findAll();
  const bookings = await bookingService.findAll(user.accessToken);

  const totalRevenue =
    bookings?.reduce((sum, b) => sum + (b.total ?? 0), 0) ?? 0;
  const pendingBookings = bookings.filter(
    (b) => b.paymentStatus === "PENDING",
  ).length;
  const approvedBookings = bookings.filter(
    (b) => b.paymentStatus === "APPROVED",
  ).length;

  const stats = [
    { label: "Total Rooms", value: rooms.length, icon: "🛸" },
    { label: "Total Bookings", value: bookings.length, icon: "📋" },
    { label: "Pending", value: pendingBookings, icon: "⏳" },
    { label: "Approved", value: approvedBookings, icon: "✅" },
    {
      label: "Revenue (THB)",
      value: totalRevenue.toLocaleString(),
      icon: "💰",
    },
  ];

  return (
    <div className="space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-pink-300 text-sm mt-1">
          Welcome back, {user.firstName}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-pink-900 bg-pink-950/30 p-4 space-y-2"
          >
            <div className="text-2xl">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-pink-300">{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Bookings</h2>
        <div className="overflow-x-auto rounded-xl border border-pink-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-pink-950/50 text-pink-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Guest</th>
                <th className="p-3">Check-in</th>
                <th className="p-3">Check-out</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map((booking) => (
                <tr key={booking.id} className="border-t border-pink-900/70">
                  <td className="p-3">#{booking.id}</td>
                  <td className="p-3">
                    {booking.user?.firstName ?? "-"}{" "}
                    {booking.user?.lastName ?? ""}
                  </td>
                  <td className="p-3">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.paymentStatus === "APPROVED"
                          ? "bg-green-900 text-green-300"
                          : booking.paymentStatus === "PENDING"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">{booking.total?.toLocaleString()} THB</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-pink-400">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
