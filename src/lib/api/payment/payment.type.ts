import { Booking } from "../booking/booking.type";

export type PaymentStatus = "PENDING" | "APPROVED" | "FAILED";

export type UploadPaymentSlipInput = {
  bookingId: string;
  slip: File;
};

export type UpdatePaymentStatusInput = {
  bookingId: number;
  status: PaymentStatus;
};

export type PaymentResult = {
  booking: Booking;
};
