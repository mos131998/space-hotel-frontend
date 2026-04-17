export type User = {
  sub: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};

export type UserWithRoom = User & { room: User[] };

export type Hotel = "roomNumber" | "price" | "roomName";

export type GetUserProfileResponse = {
  user: UserWithRoom;
  hotel: Hotel;
};
