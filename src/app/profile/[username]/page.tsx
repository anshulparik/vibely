import Feed from "@/components/Feed/Feed";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params?.username;
  if (!username) return;

  const user = await prisma?.user?.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = auth();
  let isBlocked;

  if (currentUserId) {
    const res = await prisma?.block?.findFirst({
      where: {
        blockId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 p-3 md:p-6">
      <div className="hidden xl:block w-[20%]">
        <LeftSidebar type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="">
            <div className="relative">
              <div className="relative w-full h-64">
                <Image
                  src={user?.coverURL || "/noCover.jpg"}
                  alt=""
                  className="absolute object-cover rounded-md"
                  fill
                />
              </div>
              <div
                className="absolute right-0 -bottom-16 z-10"
                style={{ left: "calc(50% - 64px)" }}
              >
                <div className="relative w-32 h-32">
                  <Image
                    src={user?.avatarURL || "/noAvatar.jpg"}
                    alt=""
                    className="absolute object-cover rounded-full 
                    ring-4 ring-gray-700"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h1 className="text-gray-700 text-2xl font-semibold mb-4 text-center">
                {user?.firstName && user?.lastName
                  ? `${user?.firstName} ${user?.lastName}`
                  : user?.username}
              </h1>
              <div className="flex items-center justify-center gap-12 mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">
                    {user?._count?.posts}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Posts
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">
                    {user?._count?.followers}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">
                    {user?._count?.followings}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightSidebar user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
