import { LoginInput, RegisterInput } from "@/lib/schemas/auth.schema";
import { api } from "../client";
import { User } from "@/lib/api/user/user.type";

const register = (input: RegisterInput) =>
  api.post<void>("/auth/register", input);

const login = async (input: LoginInput) => {
  const res = await api.post<{ accessToken: string; user: User }>(
    "/auth/login",
    input,
  );
  return res;
};

export const authService = { register, login };
