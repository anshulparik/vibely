import React from "react";
import Post from "./Post";
import prisma from "@/lib/client";
import { getUserSession } from "@/lib/getUserSession";

const Feed = async ({ username }: { username?: string }) => {
  const user = await getUserSession();
  const userId = user?.id;

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
          followerId: +userId,
        },
        select: {
          followingId: true,
        },
      });

      const followingIds = following?.map((item) => item?.followingId);
      const ids = [+userId, ...followingIds];

      posts = await prisma?.post?.findMany({
        where: {
          userId: {
            in: ids,
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
    console.log(error, "Something went wrong while fetching posts!");
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
              <Post post={post} />
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
