"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// User follow/friend request
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

export const switchBlockRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingBlockRequestResponse = await prisma?.block?.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlockRequestResponse) {
      await prisma?.block?.delete({
        where: {
          id: existingBlockRequestResponse?.id,
        },
      });
    } else {
      await prisma?.block?.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error, "switchBlockRequest err!");
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma?.followRequest?.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma?.followRequest?.delete({
        where: {
          id: existingFollowRequest?.id,
        },
      });

      await prisma?.follower?.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error, "acceptFollowRequest err!");
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma?.followRequest?.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma?.followRequest?.delete({
        where: {
          id: existingFollowRequest?.id,
        },
      });
    }
  } catch (error) {
    console.log(error, "declineFollowRequest err!");
    throw new Error("Something went wrong!");
  }
};

// Update Profile
export const updateUserProfile = async (
  previousState: { success: boolean; error: boolean },
  payload: { formData: FormData; coverURL: string }
) => {
  try {
    const { formData, coverURL } = payload;
    const fields = Object.fromEntries(formData);
    let filteredFields: any = {};
    for (const key in fields) {
      if (fields[key]) {
        filteredFields[key] = fields[key];
      }
    }

    const Profile = z.object({
      coverURL: z.string().optional(),
      firstName: z.string().max(30).optional(),
      lastName: z.string().max(30).optional(),
      description: z.string().max(250).optional(),
      location: z.string().max(60).optional(),
      school: z.string().max(60).optional(),
      work: z.string().max(60).optional(),
      website: z.string().max(60).optional(),
    });

    if (coverURL) {
      filteredFields = { ...filteredFields, coverURL };
    }
    const validatedFields = Profile.safeParse(filteredFields);

    if (!validatedFields?.success) {
      console.log(validatedFields?.error?.flatten()?.fieldErrors);
      return { success: false, error: true };
    }

    const { userId } = auth();

    if (!userId) {
      return { success: false, error: true };
    }

    await prisma?.user?.update({
      where: {
        id: userId,
      },
      data: validatedFields?.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log(error, "updateUserProfile err!");
    return { success: false, error: true };
  }
};

// Switch Likes
export const switchLike = async (postId: number) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const existingLike = await prisma?.like?.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma?.like?.delete({
        where: {
          id: existingLike?.id,
        },
      });
    } else {
      await prisma?.like?.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error, "switchLike err!");
    throw new Error("Something went wrong!");
  }
};
