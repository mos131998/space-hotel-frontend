import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { userService } from "@/lib/api/user/user.service";
import ProfileHeader from "@/components/profile/profile-header";
import { bookingService } from "@/lib/api/booking/booking.service";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage(
  props: PageProps<"/profile/[[...targetUserId]]">,
) {
  const params = await props.params;
  const currentUser = await getCurrentUser();

  const targetUserId = params.targetUserId
    ? params.targetUserId[0]
    : currentUser.id;

  const targetUser = await userService.getUserProfile(targetUserId);
  const bookings = await bookingService.getMyBooking(currentUser.accessToken);

  return (
    <div className="space-y-6">
      <ProfileHeader user={targetUser} />

      <section className="rounded-2xl border border-pink-900 bg-[#1a0d14] p-6 text-white">
        <h2 className="text-xl font-semibold">My bookings</h2>

        {bookings.length ? (
          <div className="mt-4 space-y-3">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-xl border border-pink-900/70 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{booking.room.roomName}</h3>
                    <p className="mt-1 text-sm text-pink-100/70">
                      {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOut).toLocaleDateString()} ·{" "}
                      {booking.totalhuman} guests
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {Number(booking.total).toLocaleString()} THB
                    </p>
                    <p className="mt-1 text-sm text-pink-300">
                      {booking.paymentStatus}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-pink-100/70">
            You do not have any bookings yet.
          </p>
        )}
      </section>
    </div>
  );
}
