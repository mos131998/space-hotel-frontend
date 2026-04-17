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
  try {
    console.log("input", input);
    await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });
  } catch (error) {
    return { success: false, code: "INVALID_CREDENTIALS" };
  }
  redirect("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};
