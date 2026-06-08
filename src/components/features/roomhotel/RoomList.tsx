"use client";

import { Room } from "@/lib/api/room/room.type";
import RoomCard from "./RoomCard";

export default function RoomList({ rooms }: { rooms: Room[] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
