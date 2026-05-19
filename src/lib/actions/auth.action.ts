"use server";

import { redirect } from "next/navigation";
import { authService } from "../api/auth/auth.service";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ActionResult } from "./action.type";
import { formatActionError } from "./action.util";
import { signIn, signOut } from "../auth/auth";

export const register = async (input: RegisterInput): Promise<ActionResult> => {
  try {
    await authService.register(input);
  } catch (error) {
    formatActionError(error);
  }
  redirect("/login");
};

export const login = async (input: LoginInput) => {
  let role: string;

  try {
    const res = await authService.login(input);
    role = res.user.role;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, code: "INVALID_CREDENTIALS" }; // เฉพาะ backend error
  }

  await signIn("credentials", {
    email: input.email,
    password: input.password,
    redirect: false,
  });

  if (role === "Admin") {
    redirect("/admin");
  }
  redirect("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};
