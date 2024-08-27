"use client";
import { switchFollowRequest } from "@/actions";
import React, { useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingRequestSent,
}: {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingRequestSent: boolean;
}) => {
  const [userFollowRequest, setUserFollowRequest] = useState({
    blocked: isUserBlocked,
    following: isFollowing,
    followingRequestSent: isFollowingRequestSent,
  });

  const triggerFollowAction = async () => {
    try {
      await switchFollowRequest(userId);
      setUserFollowRequest((prev) => ({
        ...prev,
        following: prev?.following && false,
        followingRequestSent:
          !prev?.following && !prev?.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error, "triggerFollowAction err!");
    }
  };

  return (
    <>
      <form action={triggerFollowAction}>
        <button
          className="w-full text-sm text-white font-semibold bg-sky-500 
          py-1 px-2 rounded-md"
        >
          {userFollowRequest.following
            ? "Following"
            : userFollowRequest.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action="" className="self-end">
        <span
          className="text-xs text-red-600 
        font-semibold cursor-pointer"
        >
          {userFollowRequest.blocked ? "Unblock User" : "Block User"}
        </span>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
