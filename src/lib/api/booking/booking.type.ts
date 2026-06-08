import { Room } from "@/lib/api/room/room.type";

export type BookingUser = {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

export type Booking = {
  id: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalhuman: number;
  paymentStatus: "PENDING" | "APPROVED" | "FAILED";
  total: number;
  discount: number;
  slipUrl: string;
  room: Room;
  user?: BookingUser;
};

export type CreateBookingInput = {
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalhuman: number;
};
