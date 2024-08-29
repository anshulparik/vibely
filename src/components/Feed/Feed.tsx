import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth();

  let posts;

  try {
    if (username) {
      posts = await prisma?.post?.findMany({
        where: {
          user: {
            username,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!username && userId) {
      const following = await prisma.follower.findMany({
        where: {
          followerId: userId,
        },
        select: {
          followingId: true,
        },
      });

      const followingIds = following?.map((item) => item?.followingId);

      console.log(followingIds, "===== EEEE");

      posts = await prisma?.post?.findMany({
        where: {
          userId: {
            in: followingIds,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  } catch (error) {
    console.log(error, "Something ");
    throw new Error("Something went wrong while fetching posts!");
  }

  return (
    <>
      {posts && posts?.length ? (
        posts?.map((post) => {
          return (
            <div
              className="p-4 bg-white rounded-lg shadow-md
                flex flex-col gap-12"
              key={post?.id}
            >
              <Post post={post}/>
            </div>
          );
        })
      ) : (
        <span className="text-center font-semibold text-gray-600">
          No posts found!
        </span>
      )}
    </>
  );
};

export default Feed;
