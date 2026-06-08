import { api } from "@/lib/api/client";
import { Booking, CreateBookingInput } from "./booking.type";

const getMyBooking = (token: string) =>
  api.get<Booking[]>("/booking/my", { token });
const findAll = (token: string) => api.get<Booking[]>("/booking", { token });
const create = (input: CreateBookingInput, token: string) =>
  api.post<Booking>("/booking", input, { token });

export const bookingService = {
  create,
  findAll,
  getMyBooking,
};
