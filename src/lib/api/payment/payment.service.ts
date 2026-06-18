import { api } from "../client";
import { paymentEndpoint } from "./payment.endpoint";
import { PaymentInfo, PaymentResult, PaymentStatus } from "./payment.type";

const getPaymentInfo = (bookingId: number, token: string) =>
  api.get<PaymentInfo>(`/payment/${bookingId}`, { token });

const uploadSlip = (bookingId: number, slipUrl: string, token: string) =>
  api.post<PaymentResult>(
    paymentEndpoint.uploadSlip(bookingId),
    { slipUrl },
    { token },
  );

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
  getPaymentInfo,
  uploadSlip,
  updateStatus,
};
