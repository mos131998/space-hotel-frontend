"use server";

import { revalidatePath } from "next/cache";
import { roomService } from "@/lib/api/room/room.service";
import { getCurrentUser } from "@/lib/auth/session";

const uploadToCloudinary = async (file: File): Promise<string> => {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  console.log("PRESET >", preset);
  console.log("CLOUD >", cloudName);
  const form = new FormData();

  form.append("file", file);
  form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    { method: "POST", body: form },
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("upload image failed");
  }
  return data.secure_url;
};

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

export const createRoom = async (formData: FormData): Promise<void> => {
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

export const addRoomImage = async (
  roomId: number,
  formData: FormData,
): Promise<void> => {
  const user = await getCurrentUser();

  const file = formData.get("image") as File;

  if (!file || file.size === 0) {
    throw new Error("Image required");
  }

  const url = await uploadToCloudinary(file);

  await roomService.addImage(
    roomId,
    {
      url,
      order: "0",
    },
    user.accessToken,
  );

  revalidatePath("/admin/rooms");
};

export const deleteRoomImage = async (
  roomId: number,
  imageId: number,
): Promise<void> => {
  const user = await getCurrentUser();
  await roomService.deleteImage(roomId, imageId, user.accessToken);
  revalidatePath("/admin/rooms");
};
