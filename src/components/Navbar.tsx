import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";

import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div
        className="md:hidden lg:block w-[20%] 
      uppercase text-red-400 font-bold text-2xl"
      >
        <Link href="/">Vibely</Link>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex w-[50%]">
        <div className="flex items-center gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <FaHome className="text-xl" />
            <span className="font-semibold ">Home</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <FaPeopleGroup className="text-xl" />
            <span className="font-semibold">Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <FaImages className="text-xl" />
            <span className="font-semibold">Stories</span>
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
