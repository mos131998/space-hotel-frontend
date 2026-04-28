import Image from "next/image";
import Link from "next/link";

type Room = {
  id: number;
  roomName: string;
  price: number; // ✅ เปลี่ยนเป็น number ดีกว่า
  image?: string;
  description?: string;
};

export default function RoomCard({ room }: { room: Room }) {
  console.log("room", room);
  return (
    <div className="bg-[#1a0d14] rounded-xl overflow-hidden border border-pink-900 hover:border-pink-500 transition-all duration-300 group">
      {/* IMAGE */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={room.image ?? "/room1.jpg"}
          alt={room.roomName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold">{room.roomName}</h3>

        <p className="mt-2 text-sm text-pink-100/70">{room.description}</p>

        <div className="flex justify-between items-center mt-4">
          {/* PRICE */}
          <span className="text-pink-400 font-bold text-lg">
            {room.price.toLocaleString()} บาท
          </span>

          {/* BUTTON */}
          <Link
            href={`/booking?roomId=${room.id}`} // ส่ง roomId ไปที่หน้า booking
            target="_blank"
            className="bg-pink-600 px-4 py-2 rounded-lg text-white hover:bg-pink-500 transition"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
}
