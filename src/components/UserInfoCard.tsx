import Link from "next/link";
import React from "react";
import { FaLink } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";

const UserInfoCard = ({ userId }: { userId?: string }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-4"
    >
      <div
        className="text-sm font-medium
        flex items-center justify-between"
      >
        <span className="text-gray-400">User Information</span>
        <Link href="/" className="text-sky-500">
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xl text-gray-600 font-semibold">
            Anshul Parik
          </span>
          <span className="text-sm text-sky-500 font-medium">@anshulparik</span>
        </div>
        <p className="text-sm text-gray-600">
          A curious adventurer with a heart full of wonder, always ready to
          explore new places and discover hidden treasures.
        </p>
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-sm text-gray-600" />
          <span className="text-xs text-gray-400">
            Living in <span className="font-bold text-gray-600">India</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <IoSchool className="text-sm text-gray-600" />
          <span className="text-xs text-gray-400">
            Went to <span className="font-bold text-gray-600">BVP, Pune</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MdWork className="text-sm text-gray-600" />
          <span className="text-xs text-gray-400">
            Works at <span className="font-bold text-gray-600">Apple</span>
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaLink className="text-sm text-sky-500" />
            <Link href="/" className="text-sky-500 text-sm font-medium">
              website
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <FaCalendar className="text-sm text-gray-400" />
            <span className="text-xs text-gray-400">
              Joined <span className="font-bold">Nov 23</span>
            </span>
          </div>
        </div>
        <button
          className="text-sm text-white font-semibold bg-sky-500 
          py-1 px-2 rounded-md"
        >
          Follow
        </button>
        <span
          className="text-xs text-red-600 self-end 
        font-semibold cursor-pointer"
        >
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
