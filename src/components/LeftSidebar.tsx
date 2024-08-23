import React from 'react'
import ProfileCard from './ProfileCard'
import Link from 'next/link';

import { IoImages } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { IoListSharp } from "react-icons/io5";
import { IoIosAlbums } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import Ad from './Ad';

const LeftSidebar = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div
        className="p-4 bg-white rounded-lg shadow-md
        flex flex-col gap-2"
      >
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoImages className="text-xl" />
          <span className="text-sm">My Posts</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <BiTask className="text-xl" />
          <span className="text-sm">Activity</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <FaShoppingCart className="text-xl" />
          <span className="text-sm">Marketplace</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <MdEvent className="text-xl" />
          <span className="text-sm">Events</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoIosAlbums className="text-xl" />
          <span className="text-sm">Albums</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <FaVideo className="text-xl" />
          <span className="text-sm">Videos</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoNewspaper className="text-xl" />
          <span className="text-sm">News</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoLibrary className="text-xl" />
          <span className="text-sm">Courses</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoListSharp className="text-xl" />
          <span className="text-sm">Lists</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-4 p-2 
            hover:bg-sky-100 rounded-md text-gray-600 hover:text-gray-700"
        >
          <IoMdSettings className="text-xl" />
          <span className="text-sm">Settings</span>
        </Link>
      </div>
      <Ad size="sm" />
    </div>
  );
}

export default LeftSidebar