import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "../api/auth/auth.service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        console.log("credentials", credentials);
        try {
          const { user, accessToken } = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });
          console.log("user", user);
          return { ...user, accessToken };
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
});
