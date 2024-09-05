"use client";
import { switchBlockRequest, switchFollowRequest } from "@/actions";
import React, { useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingRequestSent,
}: {
  userId: number;
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

  const triggerBlockAction = async () => {
    try {
      await switchBlockRequest(userId);
      setUserFollowRequest((prev) => ({
        ...prev,
        blocked: !prev?.blocked,
      }));
    } catch (error) {
      console.log(error, "triggerBlockAction err!");
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
      <form action={triggerBlockAction} className="self-end">
        <button>
          <span
            className="text-xs text-red-600 
        font-semibold cursor-pointer"
          >
            {userFollowRequest.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
