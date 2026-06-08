import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import z from "zod";

const currentUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  accessToken: z.string(),
  avatarUrl: z.string().nullable().optional(),
  role: z.string().optional(),
});

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const { success, data } = currentUserSchema.safeParse(session.user);
  if (!success) {
    redirect("/login");
  }

  return data;
};
