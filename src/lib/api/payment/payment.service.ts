import { api } from "../client";
import { paymentEndpoint } from "./payment.endpoint";
import { PaymentResult, PaymentStatus } from "./payment.type";

const uploadSlip = (bookingId: number, slip: File, token: string) => {
  const formData = new FormData();
  formData.append("slip", slip);

  return api.post<PaymentResult>(
    paymentEndpoint.uploadSlip(bookingId),
    formData,
    { token },
  );
};

const updateStatus = (
  bookingId: number,
  status: PaymentStatus,
  token: string,
) =>
  api.patch<PaymentResult>(
    paymentEndpoint.updateStatus(bookingId),
    { status },
    { token },
  );

export const paymentService = {
  uploadSlip,
  updateStatus,
};
