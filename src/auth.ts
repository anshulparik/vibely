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
          username: user?.username,
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
  callbacks: {
    // updating user session
    async session({ session, token }) {
      if (token?.sub && token?.role && token?.username) {
        session.user.id = token?.sub;
        session.user.role = token?.role;
        session.user.username = token?.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role;
        token.username = user?.username;
      }

      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, id } = user;

          // Check for existing user by email
          const existingUser = await prisma?.user?.findUnique({
            where: {
              email: email as string,
            },
          });

          // If user does not exist, create a new user
          if (!existingUser) {
            // Generate a unique username
            let username = `${email?.split("@")[0]}`;
            let uniqueUsername = username;
            let counter = 1;
            while (
              await prisma?.user?.findUnique({
                where: { username: uniqueUsername },
              })
            ) {
              uniqueUsername = `${username}${counter++}`;
            }

            await prisma?.user?.create({
              data: {
                username: uniqueUsername,
                email: email as string,
                authProviderId: id,
                password: "", // No password needed for OAuth users
              },
            });

            // Optionally log the user creation
            console.log(`Created new user with email: ${email}`);
          }

          return true; // Allow sign-in
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false; // Deny sign-in
        }
      }

      if (account?.provider === "credentials") {
        return true; // Allow sign-in for credentials provider
      }

      return false; // Deny sign-in for unsupported providers
    },
  },
});

// http://localhost:3000/api/auth/signin
