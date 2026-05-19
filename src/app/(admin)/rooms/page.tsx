import { roomService } from "@/lib/api/room/room.service";

export default async function AdminRoomsPage() {
  const rooms = await roomService.findAll();
  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h1>จัดการห้องพัก</h1>
        <button>+ เพิ่มห้องพัก</button>
      </div>
    </div>
  );
}
