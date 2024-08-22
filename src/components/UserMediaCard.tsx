import Link from "next/link";
import Image from "next/image";
import React from "react";

const UserMediaCard = ({ userId }: { userId?: string }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-6"
    >
      <div
        className="text-sm font-medium
        flex items-center justify-between"
      >
        <span className="text-gray-400">User Media</span>
        <Link href="/" className="text-sky-500">
          See All
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {Array(6)
          ?.fill("_")
          ?.map((_) => {
            return (
              <div className="relative w-1/4 h-24">
                <Image
                  src="/post.jpg"
                  alt=""
                  className="absolute object-cover rounded-md ring-1 ring-gray-400"
                  fill
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserMediaCard;
