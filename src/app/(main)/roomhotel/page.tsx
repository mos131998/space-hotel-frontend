import RoomList from "@/components/features/roomhotel/RoomList";
import { roomService } from "@/lib/api/room/room.service";

export default async function RoomHotelPage() {
  const rooms = await roomService.findAll();

  return (
    <div className="min-h-screen bg-[#2b0015] p-6 text-white">
      <h1 className="text-2xl mb-6">Select Your Pod</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <RoomList rooms={rooms} />
        </div>

        {/* RIGHT */}
      </div>
    </div>
  );
}
