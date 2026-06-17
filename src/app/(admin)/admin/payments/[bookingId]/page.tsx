import { paymentService } from "@/lib/api/payment/payment.service";
import { getCurrentUser } from "@/lib/auth/session";
import AdminPaymentReview from "@/components/features/payment/AdminPaymentReview";
import { redirect } from "next/navigation";

export default async function AdminPaymentPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const user = await getCurrentUser();
  const { bookingId: bookingIdStr } = await params;
  const bookingId = Number(bookingIdStr);

  if (!bookingId) redirect("/admin/bookings");

  // const payment = await paymentService
  //   .getPaymentInfo(bookingId, user.accessToken)
  //   .catch(() => null);

  // if (!payment) redirect("/admin/bookings");
  let payment = null;

  try {
    payment = await paymentService.getPaymentInfo(bookingId, user.accessToken);
  } catch (err) {
    console.error("PAYMENT ERROR >", err);

    return <div className="text-white p-10">PAYMENT LOAD FAILED</div>;
  }

  return (
    <div className="min-h-screen bg-[#2b0015] p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-white text-2xl mb-6">Review Payment</h1>
        <AdminPaymentReview payment={payment} />
      </div>
    </div>
  );
}
