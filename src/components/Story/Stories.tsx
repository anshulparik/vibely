import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) return null;

  const stories = await prisma?.story?.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md 
      overflow-scroll text-xs hide-scrollbar"
    >
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} />
      </div>
    </div>
  );
};

export default Stories;
