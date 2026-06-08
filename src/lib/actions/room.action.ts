"use server";

import { revalidatePath } from "next/cache";
import { roomService } from "@/lib/api/room/room.service";
import { getCurrentUser } from "@/lib/auth/session";

const readRoomForm = (formData: FormData) => ({
  roomName: String(formData.get("roomName") ?? ""),
  roomNumber: Number(formData.get("roomNumber")),
  price: Number(formData.get("price")),
  size: Number(formData.get("size")),
  maxAdult: Number(formData.get("maxAdult")),
  maxChildren: Number(formData.get("maxChildren")),
  maxtotalhuman: Number(formData.get("maxtotalhuman")),
  bathRoom: formData.get("bathRoom") === "on",
  bathTup: formData.get("bathTup") === "on",
});

export const createRoom = async (
  formData: FormData,
): Promise<void> => {
  const user = await getCurrentUser();

  await roomService.create(readRoomForm(formData), user.accessToken);
  revalidatePath("/admin/rooms");
};

export const updateRoom = async (
  id: number,
  formData: FormData,
): Promise<void> => {
  const user = await getCurrentUser();

  await roomService.updateWithToken(
    id,
    readRoomForm(formData),
    user.accessToken,
  );
  revalidatePath("/admin/rooms");
};

export const deleteRoom = async (id: number): Promise<void> => {
  const user = await getCurrentUser();

  await roomService.remove(id, user.accessToken);
  revalidatePath("/admin/rooms");
};
