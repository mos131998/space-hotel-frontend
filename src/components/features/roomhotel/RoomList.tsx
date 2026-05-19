"use client";

import RoomCard from "./RoomCard";

type Room = {
  id: number;
  roomName: string;
  price: number;
  roomNumber: number;
  size: number;
  maxAdults: number;
  maxChildren: number;
  maxtotalhuman: number;
  bathRoom: boolean;
  bathTup: boolean;
  image?: string;
  description?: string;
};

export default function RoomList({ rooms }: { rooms: Room[] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {rooms.map((room: Room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
