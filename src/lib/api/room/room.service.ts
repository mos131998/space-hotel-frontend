import { api } from "@/lib/api/client";
import { Room } from "./room.type";

const findAll = () => api.get<Room[]>("/room");
const create = (data: Omit<Room, "id">, token: string) =>
  api.post<Room>("/room", data, { token });
const update = (id: number, data: Partial<Room>) =>
  api.patch<Room>(`/room/${id}`, data);
const updateWithToken = (id: number, data: Partial<Room>, token: string) =>
  api.patch<Room>(`/room/${id}`, data, { token });
const remove = (id: number, token: string) =>
  api.delete(`/room/${id}`, { token });
const addImage = (
  roomId: number,
  data: { url: string; order: string },
  token: string,
) => api.post(`/room/${roomId}/images`, data, { token });
const deleteImage = (roomId: number, imageId: number, token: string) =>
  api.delete(`/room/${roomId}/image/${imageId}`, { token });

export const roomService = {
  findAll,
  create,
  update,
  updateWithToken,
  remove,
  addImage,
  deleteImage,
};
