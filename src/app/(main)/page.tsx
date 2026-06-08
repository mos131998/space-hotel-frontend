import Headers from "@/components/layouts/headers";
import { Button } from "@/components/ui/button";
import { roomService } from "@/lib/api/room/room.service";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const rooms = await roomService.findAll();
  const featuredRooms = rooms.slice(0, 2);
  const heroRoom = featuredRooms[0];
  const heroImage = heroRoom?.roomImages?.[0]?.url ?? "/room4.jpg";

  return (
    <div className="min-h-screen bg-[#2b0015] text-white">
      <Headers />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-24 md:px-10">
        <section className="grid items-center gap-10 rounded-[2rem] border border-pink-900/70 bg-gradient-to-r from-[#3f0022] via-[#2b0015] to-[#14010c] p-8 shadow-2xl shadow-black/30 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-pink-300">
              Space Yager Hotel
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Space-themed stays with real-time room selection
              </h1>
              <p className="max-w-2xl text-base leading-7 text-pink-100/80 md:text-lg">
                Browse rooms from the backend, pick your dates, and send the
                booking through the same API flow used across the app.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-pink-600 px-6 text-white hover:bg-pink-500"
                size="lg"
              >
                <Link href="/Booking">Book a room</Link>
              </Button>

              <Button
                asChild
                className="border border-pink-400 bg-transparent px-6 text-pink-100 hover:bg-pink-950/60"
                size="lg"
                variant="outline"
              >
                <Link href="/roomhotel">View rooms</Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-pink-800/70">
            <Image
              alt={heroRoom?.roomName ?? "Featured space hotel room"}
              src={heroImage}
              width={900}
              height={700}
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17010d] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm text-pink-200/80">Featured room</p>
              <h2 className="mt-1 text-2xl font-semibold">
                {heroRoom?.roomName ?? "Rooms are loading from the API"}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-pink-100/80">
                {heroRoom
                  ? `Room ${heroRoom.roomNumber}, ${heroRoom.size} sqm, up to ${heroRoom.maxtotalhuman} guests.`
                  : "Room details will appear here when data is available."}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
                Featured Rooms
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Popular rooms</h2>
            </div>
            <Link
              href="/roomhotel"
              className="text-sm text-pink-200 transition hover:text-pink-100"
            >
              View more
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featuredRooms.map((room) => (
              <article
                key={room.id}
                className="overflow-hidden rounded-[1.75rem] border border-pink-900 bg-[#16020e] shadow-lg shadow-black/20"
              >
                <Image
                  alt={room.roomName}
                  src={room.roomImages?.[0]?.url ?? "/room1.jpg"}
                  width={900}
                  height={520}
                  className="h-64 w-full object-cover"
                />

                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {room.roomName}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-pink-100/80">
                        Room {room.roomNumber} · {room.size} sqm · up to{" "}
                        {room.maxtotalhuman} guests
                      </p>
                    </div>
                    <p className="shrink-0 text-lg font-semibold text-pink-400">
                      {room.price.toLocaleString()} THB
                    </p>
                  </div>

                  <Button
                    asChild
                    className="bg-pink-600 text-white hover:bg-pink-500"
                  >
                    <Link href={`/Booking?roomId=${room.id}`}>Book</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
