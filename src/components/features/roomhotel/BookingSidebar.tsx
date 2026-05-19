"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingSidebar({ roomId }: { roomId: number | null }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalhuman, setTotalhuman] = useState(1);

  const { data: session } = useSession();

  async function handleConfirm() {
    if (!roomId) {
      alert("กรุณาเลือกห้องก่อนทำการจองค่ะ");
      return;
    }
    const token = session?.user?.accessToken;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: roomId,
        checkIn,
        checkOut,
        totalhuman: Number(totalhuman),
      }),
    });
    if (res.ok) {
      alert("Booking successfully");
      router.push("/");
    } else {
      alert("Booking failed please try again");
    }
  }

  return (
    <div className="bg-[#1a0d14] p-4 rounded-xl border border-pink-900">
      <h2 className="text-white mb-4">Summary</h2>

      <div>
        <div>
          <label className="text-gray-500 text-sm">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full mt-2 text-white border border-pink-500 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="text-gray-500 text-sm">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full mt-2 text-white border border-pink-500 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="text-gray-500 text-sm">จำนวนคน</label>
          <input
            type="number"
            min={1}
            value={totalhuman}
            onChange={(e) => setTotalhuman(Number(e.target.value))}
            className="w-full mt-2 text-white border border-pink-500 rounded-lg p-2"
          />
        </div>

        <p className="text-gray-400 text-sm">check-in: {checkIn || ""}</p>
        <p className="text-gray-400 text-sm">check-out: {checkOut || ""}</p>
      </div>

      <button
        onClick={handleConfirm}
        className="mt-4 w-full bg-pink-600 py-2 rounded text-white transition"
      >
        Confirm
      </button>
    </div>
  );
}
