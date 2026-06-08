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
        const email = credentials.email;
        const password = credentials.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        try {
          const { user, accessToken } = await authService.login({
            email,
            password,
          });

          return { ...user, accessToken };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.avatarUrl = user.avatarUrl;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.accessTokenExpiresAt =
          Date.now() + ((user.expiresIn ?? 0) - 3) * 1000;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.avatarUrl = token.avatarUrl;
      session.user.id = token.sub;
      session.user.role = token.role;

      return session;
    },
  },
  trustHost: true,
});
