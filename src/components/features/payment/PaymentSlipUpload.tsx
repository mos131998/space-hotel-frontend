"use client";

import { uploadPaymentSlip } from "@/lib/actions/payment.action";
import { PaymentInfo } from "@/lib/api/payment/payment.type";
import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentSlipUpload({
  payment,
}: {
  payment: PaymentInfo;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(
    payment.slipUrl || null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setMessage(null);
  }

  function handleSubmit() {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage("Please select a slip image first.");
      return;
    }

    const formData = new FormData();
    formData.append("slip", file);

    startTransition(async () => {
      const result = await uploadPaymentSlip(payment.bookingId, formData);
      if (result.success) {
        setMessage("Slip uploaded successfully!");
        router.push("/");
      } else {
        setMessage(result.message ?? "Upload failed. Please try again.");
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
      {/* bank info */}
      <div className="bg-pink-700 border border-pink-800 rounded-2xl p-4 space-y-3">
        <h2 className="text-white text-sm font-medium mb-2">Bank Account</h2>
        <div className="flex justify-between text-sm">
          <span className="text-white">ธนาคาร</span>
          <span className="text-white">กสิกรไทย</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white">เลขบัญชี</span>
          <span className="text-white">123-4-56789-0</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white">ชื่อบัญชี</span>
          <span className="text-white">Space Hotel Co., Ltd.</span>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-[#1a0d14] border border-pink-900 rounded-xl p-4 space-y-2">
        <h2 className="text-white text-sm font-medium mb-3">Payment Summary</h2>

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
          <span className={statusColor[payment.status] ?? "text-gray-400"}>
            {payment.status}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Review within</span>
          <span className="text-white">{payment.reviewExpiresHours} hours</span>
        </div>
      </div>

      {/* Slip Upload */}
      {payment.status !== "APPROVED" && (
        <div className="bg-[#1a0d14] border border-pink-900 rounded-xl p-4 space-y-3">
          <h2 className="text-white text-sm font-medium">
            Upload Payment Slip
          </h2>

          <div
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer border border-dashed border-pink-700 rounded-lg flex items-center justify-center h-48 overflow-hidden hover:border-pink-500 transition"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Payment slip preview"
                width={300}
                height={192}
                className="object-contain h-48 w-full"
                unoptimized
              />
            ) : (
              <div className="text-center space-y-1">
                <p className="text-gray-500 text-sm">Click to upload slip</p>
                <p className="text-gray-600 text-xs">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            name="slip"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {message && (
            <p
              className={`text-sm ${message.includes("success") ? "text-green-400" : "text-pink-300"}`}
            >
              {message}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {isPending ? "Uploading..." : "Submit Slip"}
          </button>
        </div>
      )}

      {payment.status === "APPROVED" && (
        <div className="bg-green-900/20 border border-green-700 rounded-xl p-4 text-center">
          <p className="text-green-400 text-sm">
            Payment has been approved. Thank you!
          </p>
        </div>
      )}

      {payment.status === "FAILED" && (
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 text-center">
          <p className="text-red-400 text-sm">
            Payment was rejected. Please upload a new slip.
          </p>
        </div>
      )}
    </div>
  );
}
