import BookingSidebar from "@/components/features/roomhotel/BookingSidebar";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ roomId?: string }>;
}) {
  const { roomId } = await searchParams;
  return (
    <div className="min-h-screen bg-[#2b0015] p-6">
      <h1 className="text-white text-2xl mb-4">Book Your Room</h1>
      <div className="max-w-md mx-auto">
        <BookingSidebar roomId={roomId ? Number(roomId) : null} />
      </div>
    </div>
  );
}
