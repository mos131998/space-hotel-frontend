"use client";

import { createBooking } from "@/lib/actions/booking.action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function BookingSidebar({ roomId }: { roomId: number | null }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalhuman, setTotalhuman] = useState(1);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    setMessage(null);

    if (!roomId) {
      setMessage("Please select a room before booking.");
      return;
    }

    startTransition(async () => {
      const result = await createBooking({
        roomId,
        checkIn,
        checkOut,
        totalhuman: Number(totalhuman),
      });

      if (result.success) {
        const bookingId = (result.data as { id: number })?.id;
        router.push(`/payment/${bookingId}`);
        router.refresh();
        return;
      }

      setMessage(result.message ?? "Booking failed. Please try again.");
    });
  }

  return (
    <div className="bg-[#1a0d14] p-4 rounded-xl border border-pink-900">
      <h2 className="text-white mb-4">Summary</h2>

      <div className="space-y-4">
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
          <label className="text-gray-500 text-sm">Guests</label>
          <input
            type="number"
            min={1}
            value={totalhuman}
            onChange={(e) => setTotalhuman(Number(e.target.value))}
            className="w-full mt-2 text-white border border-pink-500 rounded-lg p-2"
          />
        </div>

        <div>
          <p className="text-gray-400 text-sm">check-in: {checkIn || "-"}</p>
          <p className="text-gray-400 text-sm">check-out: {checkOut || "-"}</p>
        </div>

        {message ? <p className="text-sm text-pink-300">{message}</p> : null}
      </div>

      <button
        onClick={handleConfirm}
        disabled={isPending}
        className="mt-4 w-full bg-pink-600 py-2 rounded text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Booking..." : "Confirm"}
      </button>
    </div>
  );
}
