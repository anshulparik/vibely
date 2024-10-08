"use server";

import prisma from "@/lib/client";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

// regiter user logic
export const registerUser = async (formData: FormData) => {
  let isRegistered = false;
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!username || !email || !password) {
      throw new Error("Please fill all the fields!");
    }

    const existingEmail = await prisma?.user?.findFirst({
      where: {
        email: email,
      },
    });
    const existingUsername = await prisma?.user?.findFirst({
      where: {
        username: username,
      },
    });

    if (existingEmail || existingUsername) {
      throw new Error("Userame or email already exists!");
    }

    const hashedPassword = await hash(password, 12);

    await prisma?.user?.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    isRegistered = true;
  } catch (error) {
    console.log(error, "registerUser err!");
    throw new Error("Somethig went wrong!");
  }

  if (isRegistered) {
    redirect("/auth/login");
  }
};

export const userLogin = async (formData: FormData) => {
  let isLoggedIn = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Please fill all the fields!");
    }

    const response = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    isLoggedIn = true;
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }

  if (isLoggedIn) {
    redirect("/");
  }
};

export const googleLogin = async () => {
  await signIn("google");
};
