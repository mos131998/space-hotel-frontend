import { revalidatePath } from "next/cache";
import { paymentService } from "../api/payment/payment.service";
import { getCurrentUser } from "../auth/session";
import { ActionResult } from "@/lib/actions/action.type";
import { formatActionError } from "./action.util";

import { PaymentStatus } from "../api/payment/payment.type";

export const uploadPaymentSlip = async (
  bookingId: number,
  formData: FormData,
): Promise<ActionResult> => {
  const user = await getCurrentUser();
  const slip = formData.get("slip");

  if (!bookingId || !(slip instanceof File) || slip.size === 0) {
    return {
      success: false,
      code: "INVALID_PAYMENT_SLIP",
      message: "Please upload Slip.",
    };
  }

  try {
    const result = await paymentService.uploadSlip(
      bookingId,
      slip,
      user.accessToken,
    );
    revalidatePath("/profile");
    return { success: true, data: result };
  } catch (error) {
    return formatActionError(error);
  }
};

export const updatePaymentStatus = async (
  bookingId: number,
  status: PaymentStatus,
): Promise<ActionResult> => {
  const user = await getCurrentUser();
  if (!bookingId || !status) {
    return {
      success: false,
      code: "INVALID_PAYMENT_STATUS",
      message: "Invalid payment status.",
    };
  }
  try {
    const result = await paymentService.updateStatus(
      bookingId,
      status,
      user.accessToken,
    );
    revalidatePath("/admin/bookings");
    revalidatePath("/profile");
    return { success: true, data: result };
  } catch (error) {
    return formatActionError(error);
  }
};
