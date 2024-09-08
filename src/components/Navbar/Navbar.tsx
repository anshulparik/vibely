"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { getSession } from "next-auth/react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userSession = await getSession();
      setUser(userSession?.user);
    };

    fetchUser();
  }, []);

  return (
    <nav className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div
        className="md:hidden lg:block w-[20%] 
      uppercase text-sky-500 font-extrabold text-2xl"
      >
        <Link href="/">Vibely</Link>
      </div>

      {/* CENTER */}
      <div
        className="hidden md:flex
       w-[50%] items-center justify-between"
      >
        <div className="flex items-center gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <FaHome />
            <span className="text-sm">Home</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <FaUserFriends />
            <span className="text-sm">Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <FaImages />
            <span className="text-sm">Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2">
          <input
            type="text"
            placeholder="Search..."
            className="text-sm p-[2px]
            placeholder:text-sm
            focus:text-sm focus:text-gray-600 focus:border-gray-600
            appearance-none border-0 border-b-2 
            outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {false && (
          <div
            className="text-sky-500 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}

        {user && (
          <div className="hidden md:flex text-sky-500 items-center gap-3">
            <FaPeopleGroup className="cursor-pointer text-xl" />
            <BiSolidMessageSquareDetail className="cursor-pointer text-xl" />
            <IoNotifications className="cursor-pointer text-xl" />
          </div>
        )}
        {false && "prfile"}

        {!user && (
          <div className="hidden md:flex cursor-pointer text-sky-500 items-center gap-2">
            <FaUserCircle className="text-2xl" />
            <Link href="/auth/login" className="font-bold">
              Sign In
            </Link>
          </div>
        )}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;