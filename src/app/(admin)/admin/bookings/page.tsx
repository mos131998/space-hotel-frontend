import { bookingService } from "@/lib/api/booking/booking.service";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminBookingsPage() {
  const user = await getCurrentUser();
  const bookings = await bookingService.findAll(user.accessToken);

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
                <td className="p-3">{booking.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
