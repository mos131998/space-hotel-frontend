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

    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createBooking({
          roomId,
          checkIn,
          checkOut,
          totalhuman,
        });

        console.log("BOOK RESULT >", result);

        if (!result.success) {
          setMessage(result.message ?? "Booking failed");
          return;
        }

        const booking = result.data as {
          id?: number;
        };

        console.log("BOOKING >", booking);

        if (!booking?.id) {
          setMessage("Booking created but booking id missing");
          return;
        }

        router.push(`/payment/${booking.id}`);
      } catch (error) {
        console.error("BOOK ERROR >", error);
        setMessage("Something went wrong.");
      }
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
            className="
            w-full
            mt-2
            text-white
            border
            border-pink-500
            rounded-lg
            p-2
           scheme:light
            "
          />
        </div>

        <div>
          <label className="text-gray-500 text-sm">Check-out</label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="
            w-full
            mt-2
            text-white
            border
            border-pink-500
            rounded-lg
            p-2
           scheme:light
            "
          />
        </div>

        <div>
          <label className="text-gray-500 text-sm">Guests</label>

          <input
            type="number"
            min={1}
            value={totalhuman}
            onChange={(e) => setTotalhuman(Number(e.target.value))}
            className="
            w-full
            mt-2
            text-white
            border
            border-pink-500
            rounded-lg
            p-2
            "
          />
        </div>

        <div>
          <p className="text-gray-400 text-sm">check-in: {checkIn || "-"}</p>

          <p className="text-gray-400 text-sm">check-out: {checkOut || "-"}</p>
        </div>

        {message && <p className="text-sm text-red-400">{message}</p>}
      </div>

      <button
        onClick={handleConfirm}
        disabled={isPending}
        className="
        mt-4
        w-full
        bg-pink-600
        py-2
        rounded
        text-white
        disabled:opacity-50
        "
      >
        {isPending ? "Booking..." : "Confirm"}
      </button>
    </div>
  );
}
