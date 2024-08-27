"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export const switchFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // checking if currentUser is already following the user.
    const existingFollowingResponse = await prisma?.follower?.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    // unfollowing the user if alreay following.
    if (existingFollowingResponse) {
      await prisma?.follower?.delete({
        where: {
          id: existingFollowingResponse?.id,
        },
      });
    } else {
      // checking if currentUser's follow req is already sent to the user.
      const existingFollowRequestResponse =
        await prisma?.followRequest?.findFirst({
          where: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });

      // deleting the request if it alreay exists
      if (existingFollowRequestResponse) {
        await prisma?.followRequest?.delete({
          where: {
            id: existingFollowRequestResponse?.id,
          },
        });
      } else {
        // if not then sending the follow request to the user
        await prisma?.followRequest?.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error, "switchFollowRequest err!");
    throw new Error("Something went wrong!");
  }
};
