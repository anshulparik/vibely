import Link from "next/link";
import Image from "next/image";
import React from "react";

import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

const FriendRequest = () => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-4"
    >
      <div
        className="text-sm font-medium
        flex items-center justify-between"
      >
        <span className="text-gray-400">Friend Requests</span>
        <Link href="/" className="text-sky-500">
          See All
        </Link>
      </div>
      {Array(3)
        ?.fill("_")
        ?.map(() => {
          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 relative">
                  <Image
                    src="/profile_img.png"
                    alt=""
                    className="ring-1 rounded-full ring-gray-600 absolute object-cover"
                    fill
                  />
                </div>
                <span className="text-gray-600 text-sm font-semibold">
                  Eric John
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MdCheckCircle className="cursor-pointer text-2xl text-green-600" />
                <MdCancel className="cursor-pointer text-2xl text-red-600" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FriendRequest;
