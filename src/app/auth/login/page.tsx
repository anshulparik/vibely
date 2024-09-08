import { googleLogin, userLogin } from "@/actions/user";
import { getUserSession } from "@/lib/getUserSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const Login = async () => {
  const user = await getUserSession();
  if (user) redirect("/");

  const triggerUserLogin = async (formData: FormData) => {
    const response = await userLogin(formData);
    if (response) {
      redirect("/");
    }
  };

  return (
    <div className="bg-sky-100 h-screen flex items-center justify-center">
      <div
        className="p-4 bg-white rounded-lg shadow-md
        flex flex-col items-center gap-8 w-[90%] md:w-[40%]"
      >
        <div
          className="md:hidden lg:block w-[20%] 
          uppercase text-sky-500 font-extrabold text-2xl"
        >
          Vibely
        </div>
        <form
          action={(formData) => triggerUserLogin(formData)}
          className="w-full flex flex-col gap-8"
        >
          <div className="text-sm flex flex-wrap justify-between gap-1 xl:gap-4">
            <div className="w-full flex flex-col gap-4 ">
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
            <div className="w-full flex flex-col gap-4 ">
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
          <button
            className="text-[15px] text-white font-bold bg-sky-500 
             py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>
        <form action={googleLogin} className="w-full">
          <button
            className="text-[15px] text-gray-700 font-bold bg-sky-100 
            py-2 px-4 rounded-md  flex items-center justify-center gap-2 w-full"
          >
            <FaGoogle />
            Google
          </button>
        </form>
        <p className="text-[15px] font-semibold flex items-center gap-2 ">
          <span className="text-gray-600">New user?</span>
          <span className="text-sky-500 ">
            <Link href="/auth/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
