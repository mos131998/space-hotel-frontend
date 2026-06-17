import { paymentService } from "@/lib/api/payment/payment.service";
import { getCurrentUser } from "@/lib/auth/session";
import PaymentSlipUpload from "@/components/features/payment/PaymentSlipUpload";
import { redirect } from "next/navigation";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const user = await getCurrentUser();
  const { bookingId: bookingIdStr } = await params;
  const bookingId = Number(bookingIdStr);

  if (!bookingId) redirect("/profile");

  const payment = await paymentService
    .getPaymentInfo(bookingId, user.accessToken)
    .catch(() => null);

  if (!payment) redirect("/profile");

  return (
    <div className="min-h-screen bg-[#2b0015] p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-white text-2xl mb-6">Payment</h1>
        <PaymentSlipUpload payment={payment} />
      </div>
    </div>
  );
}
