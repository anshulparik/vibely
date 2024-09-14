"use server";

import { getUserSession } from "@/lib/getUserSession";
import prisma from "@/lib/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// User follow/friend request
export const switchFollowRequest = async (userId: number) => {
  const user = await getUserSession();
  const currentUserId = user?.id;

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // checking if currentUser is already following the user.
    const existingFollowingResponse = await prisma?.follower?.findFirst({
      where: {
        followerId: +currentUserId,
        followingId: +userId,
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
            senderId: +currentUserId,
            receiverId: +userId,
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
            senderId: +currentUserId,
            receiverId: +userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error, "switchFollowRequest err!");
    throw new Error("Something went wrong!");
  }
};

export const switchBlockRequest = async (userId: number) => {
  const user = await getUserSession();
  const currentUserId = user?.id;

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingBlockRequestResponse = await prisma?.block?.findFirst({
      where: {
        blockerId: +currentUserId,
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
          blockerId: +currentUserId,
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
  const user = await getUserSession();
  const currentUserId = user?.id;

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma?.followRequest?.findFirst({
      where: {
        senderId: +userId,
        receiverId: +currentUserId,
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
          followerId: +userId,
          followingId: +currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error, "acceptFollowRequest err!");
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const user = await getUserSession();
  const currentUserId = user?.id;

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma?.followRequest?.findFirst({
      where: {
        senderId: +userId,
        receiverId: +currentUserId,
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
  payload: { formData: FormData; coverURL: string; avatarURL: string }
) => {
  try {
    const { formData, coverURL, avatarURL } = payload;
    const fields = Object.fromEntries(formData);
    let filteredFields: any = {};
    for (const key in fields) {
      if (fields[key]) {
        filteredFields[key] = fields[key];
      }
    }

    const Profile = z.object({
      avatarURL: z.string().optional(),
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
    if (avatarURL) {
      filteredFields = { ...filteredFields, avatarURL };
    }

    const validatedFields = Profile.safeParse(filteredFields);

    if (!validatedFields?.success) {
      // console.log(validatedFields?.error?.flatten()?.fieldErrors);
      return { success: false, error: true };
    }

    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      return { success: false, error: true };
    }

    await prisma?.user?.update({
      where: {
        id: +userId,
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
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const existingLike = await prisma?.like?.findFirst({
      where: {
        postId,
        userId: +userId,
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
          userId: +userId,
        },
      });
    }
  } catch (error) {
    console.log(error, "switchLike err!");
    throw new Error("Something went wrong!");
  }
};

// Add Comment
export const addComment = async (postId: number, description: string) => {
  try {
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const createdComment = await prisma?.comment?.create({
      data: {
        postId,
        description,
        userId: +userId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error, "addComment err!");
    throw new Error("Something went wrong!");
  }
};

// Delete Comment
export const deleteComment = async (commentId: number) => {
  try {
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma?.comment?.delete({
      where: {
        id: commentId,
        userId: +userId,
      },
    });

  } catch (error) {
    console.log(error, "deleteComment err!");
    throw new Error("Something went wrong!");
  }
};

// Add Post
export const addPost = async (formData: FormData, postImage: string) => {
  try {
    const description = formData?.get("description") as string;
    const Description = z.string().min(1).max(255);
    const validatedDescription = Description.safeParse(description);

    if (!validatedDescription?.success) {
      return;
    }

    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma?.post?.create({
      data: {
        description: validatedDescription?.data,
        userId: +userId,
        postURL: postImage,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error, "addPost err!");
    throw new Error("Something went wrong!");
  }
};

// Add Story
export const addStory = async (storyImage: string) => {
  try {
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const existingStory = await prisma?.story?.findFirst({
      where: {
        userId: +userId,
      },
    });

    if (existingStory) {
      await prisma?.story?.delete({
        where: {
          id: existingStory?.id,
        },
      });
    }

    const createdStory = await prisma?.story?.create({
      data: {
        userId: +userId,
        storyURL: storyImage,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error, "addStory err!");
    throw new Error("Something went wrong!");
  }
};

// Delete Post
export const deletePost = async (postId: number) => {
  try {
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    await prisma?.post?.delete({
      where: {
        id: postId,
        userId: +userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error, "deletePost err!");
    throw new Error("Something went wrong!");
  }
};

// Switch Likes
export const switchCommentLike = async (commentId: number) => {
  try {
    const userSession = await getUserSession();
    const userId = userSession?.id;

    if (!userId) {
      throw new Error("User is not authenticated!");
    }

    const existingLike = await prisma?.like?.findFirst({
      where: {
        commentId,
        userId: +userId,
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
          commentId,
          userId: +userId,
        },
      });
    }
  } catch (error) {
    console.log(error, "switchLike err!");
    throw new Error("Something went wrong!");
  }
};
