import { googleLogin, userLogin } from "@/actions/user";
import { auth } from "@/auth";
import { getUserSession } from "@/lib/getUserSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

// export const getUserSession = async () => {
//   const session = await auth();
//   const user = session?.user;
//   return user;
// };

const Login = async () => {
  const user = await getUserSession();
  if (user) redirect("/");

  return (
    <div
      className="bg-sky-100 md:px-8 lg:px-16 xl:px-32 2xl:px-64 
      h-screen flex flex-col items-center justify-center"
    >
      <div
        className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-8"
      >
        <form action={userLogin} className="flex flex-col gap-8">
          <div className="text-sm flex flex-wrap justify-between gap-1 xl:gap-4">
            <div className="flex flex-col gap-4 w-80">
              <label htmlFor="" className="text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                placeholder={"Email"}
              />
            </div>
          </div>
          <div className="text-sm flex flex-wrap justify-between gap-1 xl:gap-4">
            <div className="flex flex-col gap-4 w-80">
              <label htmlFor="" className="text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                placeholder={"Password"}
              />
            </div>
          </div>
          <button>Login</button>
        </form>
        <form action={googleLogin} className="flex gap-4 items-center">
          <FaGoogle />
          <button>Google</button>
        </form>
        <p>
          New user? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
