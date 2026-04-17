import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { userService } from "@/lib/api/user/user.service";
import ProfileHeader from "@/components/profile/profile-header";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage(
  props: PageProps<"/profile/[[...targetUserId]]">,
) {
  const params = await props.params;
  const currentUser = await getCurrentUser();

  const targetUserId = params.targetUserId
    ? params.targetUserId[0]
    : currentUser.id;

  const targetUser = await userService.getUserProfile(targetUserId);

  return <div></div>;
}
