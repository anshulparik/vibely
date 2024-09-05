import Link from "next/link";
import React from "react";

import prisma from "@/lib/client";
import FriendRequestsList from "./FriendRequestsList";
import { getUserSession } from "@/lib/getUserSession";

const FriendRequest = async () => {
  const userSession = await getUserSession();
  const userId = userSession?.id;
  if (!userId) return null;

  let friendRequests;
  try {
    friendRequests = await prisma?.followRequest?.findMany({
      where: {
        receiverId: +userId,
      },
      include: {
        sender: true,
      },
    });
  } catch (error) {
    console.log(error, "Error fetching posts with media!");
  }

  if (friendRequests && friendRequests?.length === 0) return null;

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
      <FriendRequestsList friendRequests={friendRequests} />
    </div>
  );
};

export default FriendRequest;
