import { bookingService } from "@/lib/api/booking/booking.service";
import { getCurrentUser } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminBookingsPage() {
  const user = await getCurrentUser();
  const bookings = await bookingService.findAll(user.accessToken);

  const statusColor: Record<string, string> = {
    PENDING: "text-yellow-400",
    APPROVED: "text-green-400",
    FAILED: "text-red-400",
  };

  return (
    <div className="text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Manage bookings</h1>
        <p className="mt-1 text-sm text-pink-100/70">
          Review bookings from the backend.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-pink-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-pink-950/50 text-pink-100">
            <tr>
              <th className="p-3">Guest</th>
              <th className="p-3">Room</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-pink-900/70">
                <td className="p-3">
                  {booking.user
                    ? `${booking.user.firstName} ${booking.user.lastName}`
                    : "-"}
                </td>
                <td className="p-3">{booking.room.roomName}</td>
                <td className="p-3">
                  {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {Number(booking.total).toLocaleString()} THB
                </td>
                <td
                  className={`p-3 ${statusColor[booking.paymentStatus] ?? "text-gray-400"}`}
                >
                  {booking.paymentStatus}
                </td>
                <td className="p-3">
                  <Link
                    href={`/admin/payments/${booking.id}`}
                    className="px-3 py-1 text-xs bg-pink-700 hover:bg-pink-600 text-white rounded-lg transition"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
