import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { getUserSession } from "@/lib/getUserSession";
import Link from "next/link";

const ProfileCard = async () => {
  const userSession = await getUserSession();
  const userId = userSession?.id;
  if (!userId) return;

  const user = await prisma?.user?.findFirst({
    where: {
      id: +userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
        flex flex-col gap-6"
    >
      <div className="relative">
        <div className="relative w-full h-20">
          <Image
            src={user?.coverURL || "/noCover.jpg"}
            alt=""
            className="absolute object-cover rounded-md"
            fill
          />
        </div>
        <div
          className="absolute right-0 -bottom-6 z-10"
          style={{ left: "calc(50% - 24px)" }}
        >
          <div className="relative w-12 h-12">
            <Image
              src={user?.avatarURL || "/noAvatar.jpg"}
              alt=""
              className="absolute object-cover rounded-full ring-1 ring-gray-600"
              fill
            />
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <span className="font-bold text-sky-500 mb-2">
          {user?.firstName && user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : user?.username}
        </span>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex">
            {Array(3)
              ?.fill("_")
              ?.map((_, index) => {
                return (
                  <div key={`key-${index}`} className="h-3 w-3 relative">
                    <Image
                      src="/profile_img.png"
                      alt=""
                      className="ring-1 rounded-full ring-gray-600 absolute object-cover"
                      fill
                    />
                  </div>
                );
              })}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            {`${user?._count?.followers} Followers`}
          </span>
        </div>
        <Link href={`profile/${user?.username}`}>
          <button
            className="text-xs text-white font-semibold bg-sky-500 
            py-1 px-2 rounded-md"
          >
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
