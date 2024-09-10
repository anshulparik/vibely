import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiCupcake } from "react-icons/gi";

const Birthdays = () => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-4"
    >
      <div
        className="text-sm font-medium
        flex items-center justify-between"
      >
        <span className="text-gray-400">Birthdays</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative">
            <Image
              src={"/profile_img.png" || "/noAvatar.jpg"}
              alt=""
              className="rounded-full ring-1 ring-gray-600 absolute object-cover"
              fill
            />
          </div>
          <span className="text-gray-600 text-sm font-semibold">Eric John</span>
        </div>
        <button
          className="text-xs text-white font-semibold bg-sky-500 
          py-1 px-2 rounded-md"
        >
          Celebrate
        </button>
      </div>
      <div className="p-4 bg-sky-100 rounded-lg flex items-center gap-4">
        <GiCupcake className="text-3xl text-gray-700" />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming bithdays.
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
