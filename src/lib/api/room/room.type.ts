export type Room = {
  id: number;
  roomNumber: number;
  roomName: string;
  price: number;
  size: number;
  maxAdult: number;
  maxChildren: number;
  maxtotalhuman: number;
  bathRoom: boolean;
  bathTup: boolean;
  roomImages?: RoomImage[];
};

export type RoomImage = {
  id: number;
  roomId: number;
  url: string;
  order: string;
};
