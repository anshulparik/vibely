import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "./lib/client";
import { compare } from "bcryptjs";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // google
    google({
      clientId: process?.env?.AUTH_GOOGLE_ID,
      clientSecret: process?.env?.AUTH_GOOGLE_SECRET,
    }),
    // custom
    credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // login logic
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin(
            "Please provide both email and password!"
          );
        }

        const user = await prisma?.user?.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new CredentialsSignin("Invalid email or password!");
        }

        const isMatched = await compare(password, user?.password);
        if (!isMatched) {
          throw new CredentialsSignin("Invalid email or password!");
        }

        const userData = {
          id: user?.id?.toString(),
          userame: user?.username,
          email: user?.email,
          role: user?.role,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});

// http://localhost:3000/api/auth/signin
