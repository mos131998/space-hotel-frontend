import RoomCard from "./RoomCard";

type Room = {
  id: number;
  roomName: string;
  price: number;
  roomNumber: number;
  size: number;
  maxAdults: number;
  maxChildren: number;
  maxtotalhuman: number;
  bathRoom: boolean;
  bathTup: boolean;
  image?: string;
  description?: string;
};

async function getRooms() {
  const res = await fetch(`${process.env.BACKEND_URL}/room`);
  const data = await res.json();
  return data.data ?? [];
}

export default async function RoomList() {
  const rooms = await getRooms();

  return (
    <div className="grid grid-cols-1 gap-6">
      {rooms.map((room: Room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
