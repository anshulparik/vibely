import Link from "next/link";
import React from "react";
import { FaLink } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const userCreatedAt = new Date(user?.createdAt);
  const formattedDate = userCreatedAt.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingRequestSent = false;

  const { userId: currentUserId } = auth();
  if (currentUserId) {
    const userBlockedResponse = await prisma?.block?.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user?.id,
      },
    });

    userBlockedResponse ? (isUserBlocked = true) : (isUserBlocked = false);

    const followingResponse = await prisma?.follower?.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user?.id,
      },
    });

    followingResponse ? (isFollowing = true) : (isFollowing = false);

    const followRequestResponse = await prisma?.followRequest?.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user?.id,
      },
    });

    followRequestResponse
      ? (isFollowingRequestSent = true)
      : (isFollowingRequestSent = false);
  }

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
        {currentUserId === user?.id ? (
          <UpdateUser user={user}/>
        ) : (
          <Link href="/" className="text-sky-500">
            See All
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xl text-gray-600 font-semibold">
            {user?.firstName && user?.lastName
              ? `${user?.firstName} ${user?.lastName}`
              : user?.username}
          </span>
          <span className="text-sm text-sky-500 font-medium">
            @{user?.username}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {user?.description && user?.description}
        </p>
        {user?.location && (
          <div className="flex items-center gap-3">
            <FaLocationDot className="text-sm text-gray-600" />
            <span className="text-xs text-gray-400">
              Living in{" "}
              <span className="font-bold text-gray-600">{user?.location}</span>
            </span>
          </div>
        )}
        {user?.school && (
          <div className="flex items-center gap-3">
            <IoSchool className="text-sm text-gray-600" />
            <span className="text-xs text-gray-400">
              Went to{" "}
              <span className="font-bold text-gray-600">{user?.school}</span>
            </span>
          </div>
        )}
        {user?.work && (
          <div className="flex items-center gap-3">
            <MdWork className="text-sm text-gray-600" />
            <span className="text-xs text-gray-400">
              Works at{" "}
              <span className="font-bold text-gray-600">{user?.work}</span>
            </span>
          </div>
        )}
        <div className="mt-2 flex items-center justify-between">
          {user?.website && (
            <div className="flex items-center gap-1">
              <FaLink className="text-sm text-sky-500" />
              <Link
                href={user?.website}
                className="text-sky-500 text-sm font-medium"
              >
                {user?.website}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-1">
            <FaCalendar className="text-sm text-gray-400" />
            <span className="text-xs text-gray-400">
              Joined <span className="font-bold">{formattedDate}</span>
            </span>
          </div>
        </div>
        {currentUserId && currentUserId !== user?.id && (
          <UserInfoCardInteraction
            userId={user?.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingRequestSent={isFollowingRequestSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
