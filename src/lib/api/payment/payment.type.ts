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

export type PaymentInfo = {
  bookingId: number;
  amount: string;
  discount: string;
  status: PaymentStatus;
  slipUrl: string;
  currency: string;
  reviewExpiresHours: number;
};
