"use server";

import { bookingService } from "@/lib/api/booking/booking.service";
import { CreateBookingInput } from "@/lib/api/booking/booking.type";
import { getCurrentUser } from "@/lib/auth/session";
import { ActionResult } from "./action.type";
import { formatActionError } from "./action.util";

export const createBooking = async (
  input: CreateBookingInput,
): Promise<ActionResult> => {
  const user = await getCurrentUser();

  if (!input.roomId || !input.checkIn || !input.checkOut) {
    return {
      success: false,
      code: "INVALID_BOOKING_INPUT",
      message: "Please select a room and dates before booking.",
    };
  }

  if (new Date(input.checkOut) <= new Date(input.checkIn)) {
    return {
      success: false,
      code: "INVALID_BOOKING_DATES",
      message: "Check-out date must be after check-in date.",
    };
  }

  try {
    await bookingService.create(input, user.accessToken);
    return { success: true };
  } catch (error) {
    return formatActionError(error);
  }
};
