import Image from "next/image";
import { useRouter } from "next/navigation";
import { Room } from "@/lib/api/room/room.type";

export default function RoomCard({ room }: { room: Room }) {
  const router = useRouter();
  const coverImage = room.roomImages?.[0]?.url ?? "/room1.jpg";

  return (
    <div className="bg-[#1a0d14] rounded-xl overflow-hidden border border-pink-900 hover:border-pink-500 transition-all duration-300 group">
      {/* IMAGE */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={coverImage}
          alt={room.roomName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold">{room.roomName}</h3>

        <p className="mt-2 text-sm text-pink-100/70">
          Room {room.roomNumber} · {room.size} sqm · up to{" "}
          {room.maxtotalhuman} guests
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* PRICE */}
          <span className="text-pink-400 font-bold text-lg">
            {room.price.toLocaleString()} บาท
          </span>

          {/* BUTTON */}
          <button
            onClick={() => router.push(`/Booking?roomId=${room.id}`)}
            className="bg-pink-600 px-4 py-2 rounded-lg text-white hover:bg-pink-500 transition"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
