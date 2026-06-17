"use client";

import { updatePaymentStatus } from "@/lib/actions/payment.action";
import { PaymentInfo, PaymentStatus } from "@/lib/api/payment/payment.type";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function AdminPaymentReview({
  payment,
}: {
  payment: PaymentInfo;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(payment.status);

  function handleReview(status: PaymentStatus) {
    startTransition(async () => {
      const result = await updatePaymentStatus(payment.bookingId, status);
      if (result.success) {
        setCurrentStatus(status);
        setMessage(
          status === "APPROVED"
            ? "Payment approved successfully."
            : "Payment rejected.",
        );
      } else {
        setMessage(result.message ?? "Action failed. Please try again.");
      }
    });
  }

  const statusColor: Record<string, string> = {
    PENDING: "text-yellow-400",
    APPROVED: "text-green-400",
    FAILED: "text-red-400",
  };

  return (
    <div className="space-y-4">
      {/* Payment Info */}
      <div className="bg-[#1a0d14] border border-pink-900 rounded-xl p-4 space-y-2">
        <h2 className="text-white text-sm font-medium mb-3">Payment Info</h2>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Booking ID</span>
          <span className="text-white">#{payment.bookingId}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Amount</span>
          <span className="text-white">
            {Number(payment.amount).toLocaleString()} {payment.currency}
          </span>
        </div>

        {Number(payment.discount) > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Discount</span>
            <span className="text-green-400">
              -{Number(payment.discount).toLocaleString()} {payment.currency}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className={statusColor[currentStatus] ?? "text-gray-400"}>
            {currentStatus}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Review within</span>
          <span className="text-white">{payment.reviewExpiresHours} hours</span>
        </div>
      </div>

      {/* Slip Preview */}
      <div className="bg-[#1a0d14] border border-pink-900 rounded-xl p-4 space-y-3">
        <h2 className="text-white text-sm font-medium">Payment Slip</h2>

        {payment.slipUrl ? (
          <div className="rounded-lg overflow-hidden border border-pink-900">
            <Image
              src={payment.slipUrl}
              alt="Payment slip"
              width={600}
              height={400}
              className="w-full object-contain max-h-80"
              unoptimized
            />
          </div>
        ) : (
          <div className="border border-dashed border-pink-900 rounded-lg h-32 flex items-center justify-center">
            <p className="text-gray-600 text-sm">No slip uploaded yet</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {currentStatus === "PENDING" && payment.slipUrl && (
        <div className="flex gap-3">
          <button
            onClick={() => handleReview("APPROVED")}
            disabled={isPending}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {isPending ? "Processing..." : "Approve"}
          </button>
          <button
            onClick={() => handleReview("FAILED")}
            disabled={isPending}
            className="flex-1 bg-red-800 hover:bg-red-700 text-white py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {isPending ? "Processing..." : "Reject"}
          </button>
        </div>
      )}

      {currentStatus !== "PENDING" && (
        <div
          className={`border rounded-xl p-4 text-center text-sm ${
            currentStatus === "APPROVED"
              ? "bg-green-900/20 border-green-700 text-green-400"
              : "bg-red-900/20 border-red-700 text-red-400"
          }`}
        >
          {currentStatus === "APPROVED"
            ? "This payment has been approved."
            : "This payment has been rejected."}
        </div>
      )}

      {message && (
        <p
          className={`text-sm text-center ${
            message.includes("approved") || message.includes("successfully")
              ? "text-green-400"
              : "text-pink-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
