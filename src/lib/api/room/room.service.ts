import { api } from "@/lib/api/client";
import { Room } from "./room.type";

const findAll = () => api.get<Room[]>("/room");
const create = (data: Omit<Room, "id">) => api.post<Room>("/room", data);
const update = (id: number, data: Partial<Room>) =>
  api.put<Room>(`/room/${id}`, data);
const remove = (id: number) => api.delete(`/room/${id}`);

export const roomService = { findAll, create, update, remove };
