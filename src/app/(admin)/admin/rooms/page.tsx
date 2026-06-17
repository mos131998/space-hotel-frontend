import { roomService } from "@/lib/api/room/room.service";
import {
  addRoomImage,
  createRoom,
  deleteRoom,
  deleteRoomImage,
  updateRoom,
} from "@/lib/actions/room.action";
import Image from "next/image";

export default async function AdminRoomsPage() {
  const rooms = await roomService.findAll();

  return (
    <div className="space-y-8 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage rooms</h1>
      </div>

      <form
        action={createRoom}
        className="grid gap-3 border-b border-pink-900 pb-6 md:grid-cols-4"
      >
        <input
          name="roomName"
          placeholder="Room name"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="roomNumber"
          placeholder="Room number"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="size"
          placeholder="Size"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="maxAdult"
          placeholder="Adults"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="maxChildren"
          placeholder="Children"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <input
          name="maxtotalhuman"
          placeholder="Total guests"
          type="number"
          className="rounded-md bg-white px-3 py-2 text-sm text-black"
          required
        />
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input name="bathRoom" type="checkbox" />
            Bathroom
          </label>
          <label className="flex items-center gap-2">
            <input name="bathTup" type="checkbox" />
            Bathtub
          </label>
        </div>
        <button className="rounded-md bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-500 md:col-span-4">
          Add room
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-pink-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-pink-950/50 text-pink-100">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Number</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t border-pink-900/70">
                <td className="p-3">
                  <div className="space-y-3">
                    {/* update room */}
                    <form
                      id={`room-${room.id}`}
                      action={updateRoom.bind(null, room.id)}
                      className="grid min-w-560px grid-cols-7 gap-2"
                    >
                      <input
                        name="roomName"
                        defaultValue={room.roomName}
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="roomNumber"
                        defaultValue={room.roomNumber}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="price"
                        defaultValue={room.price}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="size"
                        defaultValue={room.size}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="maxAdult"
                        defaultValue={room.maxAdult}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="maxChildren"
                        defaultValue={room.maxChildren}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />

                      <input
                        name="maxtotalhuman"
                        defaultValue={room.maxtotalhuman}
                        type="number"
                        className="rounded-md bg-white px-2 py-1 text-black"
                        required
                      />
                    </form>

                    {/* room images */}
                    <div className="flex flex-wrap gap-2">
                      {room.roomImages?.map((img) => (
                        <div key={img.id} className="relative">
                          <Image
                            src={img.url}
                            alt=""
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded object-cover"
                          />

                          <form
                            action={deleteRoomImage.bind(null, room.id, img.id)}
                          >
                            <button
                              className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-600
              text-xs
              text-white
              "
                            >
                              ×
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>

                    {/* add image */}

                    <form
                      action={addRoomImage.bind(null, room.id)}
                      className="flex gap-2"
                    >
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        required
                        className="
      rounded-md
      bg-white
      p-2
      text-black
      flex-1
    "
                      />

                      <button
                        type="submit"
                        className="
      rounded-md
      bg-pink-600
      px-3
      py-1
      text-white
    "
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </td>
                <td className="p-3">{room.roomNumber}</td>
                <td className="p-3">{room.maxtotalhuman}</td>
                <td className="p-3">{room.price.toLocaleString()} THB</td>
                <td className="space-y-2 p-3">
                  <button
                    form={`room-${room.id}`}
                    className="w-full rounded-md bg-pink-600 px-3 py-2 text-xs font-semibold text-white hover:bg-pink-500"
                  >
                    Save
                  </button>
                  <form action={deleteRoom.bind(null, room.id)}>
                    <button className="w-full rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
