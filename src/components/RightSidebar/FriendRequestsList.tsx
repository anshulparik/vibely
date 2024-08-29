"use client";

import React, { useState } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import Image from "next/image";
import { FollowRequest, User } from "@prisma/client";
import { acceptFollowRequest, declineFollowRequest } from "@/actions";

type FollowRequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestsList = ({
  friendRequests,
}: {
  friendRequests: FollowRequestWithUser[];
}) => {
  const [friendRequestsState, setFriendRequestsState] =
    useState(friendRequests);

  const acceptFriendRequest = async (requestId: number, userId: string) => {
    try {
      await acceptFollowRequest(userId);
      setFriendRequestsState((prev) =>
        prev?.filter((item) => item?.id !== requestId)
      );
    } catch (error) {
      console.log(error, "Error accepting friend request!");
    }
  };

  const declineFriendRequest = async (requestId: number, userId: string) => {
    try {
      await declineFollowRequest(userId);
      setFriendRequestsState((prev) =>
        prev?.filter((item) => item?.id !== requestId)
      );
    } catch (error) {
      console.log(error, "Error accepting friend request!");
    }
  };

  return (
    <div>
      {friendRequestsState && friendRequestsState?.length ? (
        friendRequestsState?.map((request) => {
          return (
            <div
              key={request?.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 relative">
                  <Image
                    src={request?.sender?.avatarURL || "/noAvatar.jpg"}
                    alt=""
                    className="ring-1 rounded-full ring-gray-600 absolute object-cover"
                    fill
                  />
                </div>
                <span className="text-gray-600 text-sm font-semibold">
                  {request?.sender?.firstName && request?.sender?.lastName
                    ? `${request?.sender?.firstName} ${request?.sender?.lastName}`
                    : request?.sender?.username}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <form
                  action={() =>
                    acceptFriendRequest(request?.id, request?.sender?.id)
                  }
                >
                  <button>
                    <MdCheckCircle className="cursor-pointer text-2xl text-green-600" />
                  </button>
                </form>
                <form
                  action={() =>
                    declineFriendRequest(request?.id, request?.sender?.id)
                  }
                >
                  <button>
                    <MdCancel className="cursor-pointer text-2xl text-red-600" />
                  </button>
                </form>
              </div>
            </div>
          );
        })
      ) : (
        <span className="text-center font-semibold text-gray-600">
          No friend requests found!
        </span>
      )}
    </div>
  );
};

export default FriendRequestsList;
