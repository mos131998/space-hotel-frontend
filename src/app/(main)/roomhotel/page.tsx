"use client";
import RoomList from "@/components/features/roomhotel/RoomList";
import { useEffect, useState } from "react";

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

export default function RoomHotelPage() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // fetch(`http://localhost:8000/room`)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room`)
      .then((res) => res.json())
      .then((data) => setRooms(data.data ?? []));
  }, []);

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
