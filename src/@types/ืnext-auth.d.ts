import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    avatarUrl?: string | null;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    expiresIn?: number;
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
      accessToken?: string;
      firstName?: string;
      lastName?: string;
      avatarUrl?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    avatarUrl?: string | null;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    sub: string;
    accessTokenExpiresAt?: number;
    role?: string;
  }
}
