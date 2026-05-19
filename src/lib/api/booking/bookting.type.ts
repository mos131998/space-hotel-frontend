export type booking = {
  id: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalhuman: number;
  paymentStatus: "PENDING" | "APPROVED" | "FAILED";
  total: number;
  discount: number;
  slipUrl: string;
  room: {
    id: number;
    roomName: string;
    price: number;
    roomNumber: number;
  };
};
