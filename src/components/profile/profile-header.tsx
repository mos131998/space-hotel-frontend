import { GetUserProfileResponse } from "@/lib/api/user/user.type";

export default function ProfileHeader({
  user,
}: {
  user: GetUserProfileResponse;
}) {
  return (
    <div className="bg-[#1a0d14] p-6 rounded-full border border-pink-900 text-white">
      <h1 className="text-2xl font-semibold">
        {user.user.firstName} {user.user.lastName}
      </h1>
      <p className="text-pink-300 mt-1">{user.user.email}</p>
    </div>
  );
}
