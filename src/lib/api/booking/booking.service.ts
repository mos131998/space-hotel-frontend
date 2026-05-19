import { api } from "@/lib/api/client";
import { booking } from "./bookting.type";

const getMyBooking = () => api.get<booking[]>("/booking/my");

export const bookingService = {
  getMyBooking,
};
